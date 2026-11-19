import {Controller} from "@controllers/controller";
import {AVRRunner} from "@lib/execute";
import {PinState} from "@lib/avr8js";

/**
 * Virtual SPI microSD card module.
 *
 * Emulates an SDHC card in SPI mode, enough for the standard Arduino SD.h / SPI.h
 * libraries: initialisation (CMD0, CMD8, CMD55/ACMD41, CMD58), CSD/CID reads,
 * single-block reads (CMD17), single and multi-block writes (CMD24 / CMD25) and status.
 *
 * The card holds a 64 MB FAT16 volume (no partition table) kept in memory, with only
 * the blocks that are non-zero stored. It is pre-loaded with README.TXT so sketches
 * have something to read. Files survive restarting the simulation, like a real card.
 */

const BLOCK_SIZE = 512;

// --- FAT16 volume layout -----------------------------------------------------------
const TOTAL_BLOCKS = 131072;          // 64 MB
const SECTORS_PER_CLUSTER = 4;
const RESERVED_SECTORS = 4;
const FAT_COUNT = 2;
const ROOT_ENTRIES = 512;
const SECTORS_PER_FAT = 128;
const FAT_START = RESERVED_SECTORS;
const ROOT_DIR_START = FAT_START + FAT_COUNT * SECTORS_PER_FAT;
const ROOT_DIR_SECTORS = (ROOT_ENTRIES * 32) / BLOCK_SIZE;
const DATA_START = ROOT_DIR_START + ROOT_DIR_SECTORS;

const README_TEXT =
    "Hello from the ADArC virtual SD card!\r\n" +
    "Files your sketch writes are kept here while the page is open.\r\n";

// --- SD SPI protocol constants -----------------------------------------------------
const R1_READY = 0x00;
const R1_IDLE = 0x01;
const R1_ILLEGAL_COMMAND = 0x04;
const DATA_START_BLOCK = 0xFE;
const WRITE_MULTIPLE_TOKEN = 0xFC;
const STOP_TRAN_TOKEN = 0xFD;
const DATA_RES_ACCEPTED = 0x05;

enum RxState {
    Command,        // waiting for / receiving a 6-byte command frame
    WaitDataToken,  // after CMD24/CMD25, waiting for the start-of-data token
    Data,           // receiving 512 data bytes + 2 CRC bytes
}

export class SDCard extends Controller {
    private inserted = true;
    private blocks = new Map<number, Uint8Array>();

    private idle = true;
    private appCommand = false;
    private rxState = RxState.Command;
    private command: number[] = [];
    private writeBlock = 0;
    private multiWrite = false;
    private dataBuffer = new Uint8Array(BLOCK_SIZE + 2);
    private dataIndex = 0;
    private outQueue: number[] = [];
    private outIndex = 0;
    private filesChanged = false;

    constructor() {
        super();
        this.format();
    }

    override update(state: Record<string, any>) {
        if (state.card !== undefined) {
            this.inserted = state.card !== "Removed";
            this.resetProtocol();
        }
    }

    setup() {
        this.resetProtocol();
        AVRRunner.getInstance().board.spis[0]?.addListener(this.onSpiByte);
    }

    override cleanup() {
        AVRRunner.getInstance().board.spis[0]?.removeListener(this.onSpiByte);
        this.logFiles();
    }

    // --- SPI -------------------------------------------------------------------------

    private get selected(): boolean {
        return !!this.pins.cs?.[0] && this.pins.cs[0].digital.state === PinState.Low;
    }

    private onSpiByte = (mosi: number) => {
        let miso = 0xFF;

        if (!this.selected) {
            // Deselected: MISO idles high. Anything we were sending is abandoned.
            this.outQueue = [];
            this.outIndex = 0;
            if (this.rxState === RxState.Command) {
                this.command = [];
            }
            if (this.filesChanged) {
                this.filesChanged = false;
                this.logFiles();
            }
        } else if (this.inserted) {
            miso = this.nextOutByte();
            this.receive(mosi);
        }

        const spi = AVRRunner.getInstance().board.spis[0];
        AVRRunner.getInstance().board.cpu.addClockEvent(() => spi.completeTransfer(miso), spi.transferCycles);
    };

    private nextOutByte(): number {
        if (this.outIndex < this.outQueue.length) {
            return this.outQueue[this.outIndex++];
        }
        if (this.outQueue.length) {
            this.outQueue = [];
            this.outIndex = 0;
        }
        return 0xFF;
    }

    private respond(bytes: ArrayLike<number>) {
        for (let i = 0; i < bytes.length; i++) {
            this.outQueue.push(bytes[i]);
        }
    }

    private receive(byte: number) {
        switch (this.rxState) {
            case RxState.Command:
                if (this.command.length === 0) {
                    // A command frame starts with 01xxxxxx; anything else is filler.
                    if ((byte & 0xC0) !== 0x40) {
                        return;
                    }
                    // A new command cancels any response still being read out.
                    this.outQueue = [];
                    this.outIndex = 0;
                }
                this.command.push(byte);
                if (this.command.length === 6) {
                    const cmd = this.command[0] & 0x3F;
                    const arg = ((this.command[1] << 24) | (this.command[2] << 16) |
                        (this.command[3] << 8) | this.command[4]) >>> 0;
                    this.command = [];
                    this.execute(cmd, arg);
                }
                return;

            case RxState.WaitDataToken:
                if (byte === DATA_START_BLOCK || (this.multiWrite && byte === WRITE_MULTIPLE_TOKEN)) {
                    this.rxState = RxState.Data;
                    this.dataIndex = 0;
                } else if (this.multiWrite && byte === STOP_TRAN_TOKEN) {
                    this.multiWrite = false;
                    this.rxState = RxState.Command;
                    this.respond([0x00, 0xFF]); // short busy period
                } else if (!this.multiWrite && (byte & 0xC0) === 0x40) {
                    // Host gave up on the write and sent a new command.
                    this.rxState = RxState.Command;
                    this.receive(byte);
                }
                return;

            case RxState.Data:
                this.dataBuffer[this.dataIndex++] = byte;
                if (this.dataIndex === BLOCK_SIZE + 2) {
                    this.writeBlockData(this.writeBlock, this.dataBuffer.subarray(0, BLOCK_SIZE));
                    this.respond([DATA_RES_ACCEPTED, 0x00, 0xFF]); // accepted, then busy, then ready
                    if (this.multiWrite) {
                        this.writeBlock++;
                        this.rxState = RxState.WaitDataToken;
                    } else {
                        this.rxState = RxState.Command;
                    }
                }
                return;
        }
    }

    private execute(cmd: number, arg: number) {
        const r1 = this.idle ? R1_IDLE : R1_READY;

        if (this.appCommand) {
            this.appCommand = false;
            switch (cmd) {
                case 41: // ACMD41 SD_SEND_OP_COND: initialisation finishes immediately
                    this.idle = false;
                    this.respond([R1_READY]);
                    return;
                case 13: // ACMD13 SD_STATUS
                    this.respond([r1, 0x00, DATA_START_BLOCK, ...new Uint8Array(64), 0xFF, 0xFF]);
                    return;
                case 22: // ACMD22 number of written blocks
                    this.respond([r1, DATA_START_BLOCK, 0, 0, 0, 0, 0xFF, 0xFF]);
                    return;
                case 23: // ACMD23 pre-erase count
                    this.respond([r1]);
                    return;
            }
            // Other app commands fall through to the normal command table.
        }

        switch (cmd) {
            case 0: // GO_IDLE_STATE
                this.idle = true;
                this.respond([R1_IDLE]);
                return;
            case 8: // SEND_IF_COND: echo voltage range + check pattern (SD v2 card)
                this.respond([r1, 0x00, 0x00, (arg >> 8) & 0x0F, arg & 0xFF]);
                return;
            case 9: // SEND_CSD
                this.respond([r1, 0xFF, DATA_START_BLOCK, ...SDCard.csd(), 0xFF, 0xFF]);
                return;
            case 10: // SEND_CID
                this.respond([r1, 0xFF, DATA_START_BLOCK, ...SDCard.cid(), 0xFF, 0xFF]);
                return;
            case 12: // STOP_TRANSMISSION (stuff byte, then R1)
                this.respond([0xFF, r1]);
                return;
            case 13: // SEND_STATUS (R2)
                this.respond([r1, 0x00]);
                return;
            case 16: // SET_BLOCKLEN
                this.respond([r1]);
                return;
            case 17: // READ_SINGLE_BLOCK (SDHC: arg is the block number)
                if (arg >= TOTAL_BLOCKS) {
                    this.respond([r1 | 0x40]); // address error
                    return;
                }
                this.respond([r1, 0xFF, DATA_START_BLOCK, ...this.readBlockData(arg), 0xFF, 0xFF]);
                return;
            case 24: // WRITE_BLOCK
            case 25: // WRITE_MULTIPLE_BLOCK
                if (arg >= TOTAL_BLOCKS) {
                    this.respond([r1 | 0x40]);
                    return;
                }
                this.writeBlock = arg;
                this.multiWrite = cmd === 25;
                this.rxState = RxState.WaitDataToken;
                this.respond([r1]);
                return;
            case 32: // ERASE_WR_BLK_START
            case 33: // ERASE_WR_BLK_END
            case 38: // ERASE
                this.respond([r1]);
                return;
            case 55: // APP_CMD: next command is an ACMD
                this.appCommand = true;
                this.respond([r1]);
                return;
            case 58: // READ_OCR: powered up, high capacity (SDHC), 3.2-3.4V
                this.respond([r1, 0xC0, 0xFF, 0x80, 0x00]);
                return;
            case 59: // CRC_ON_OFF
                this.respond([r1]);
                return;
            default:
                this.respond([r1 | R1_ILLEGAL_COMMAND]);
                return;
        }
    }

    private resetProtocol() {
        this.idle = true;
        this.appCommand = false;
        this.rxState = RxState.Command;
        this.command = [];
        this.multiWrite = false;
        this.outQueue = [];
        this.outIndex = 0;
    }

    // --- Card registers ----------------------------------------------------------------

    /** CSD version 2.0 (SDHC). Capacity = (C_SIZE + 1) * 512 KB. */
    private static csd(): Uint8Array {
        const cSize = TOTAL_BLOCKS / 1024 - 1;
        return new Uint8Array([
            0x40, 0x0E, 0x00, 0x32, 0x5B, 0x59, 0x00,
            (cSize >> 16) & 0x3F, (cSize >> 8) & 0xFF, cSize & 0xFF,
            0x7F, 0x80, 0x0A, 0x40, 0x00, 0x01,
        ]);
    }

    private static cid(): Uint8Array {
        return new Uint8Array([
            0x41, 0x44, 0x41, // manufacturer / OEM: "ADA"
            0x52, 0x43, 0x53, 0x44, 0x20, // product name "RCSD "
            0x10, 0x00, 0x00, 0x00, 0x01, 0x01, 0x6A, 0x01,
        ]);
    }

    // --- Block storage -----------------------------------------------------------------

    private readBlockData(block: number): Uint8Array {
        return this.blocks.get(block) ?? new Uint8Array(BLOCK_SIZE);
    }

    private writeBlockData(block: number, data: Uint8Array) {
        if (data.every(b => b === 0)) {
            this.blocks.delete(block);
        } else {
            this.blocks.set(block, new Uint8Array(data));
        }
        if (block >= ROOT_DIR_START && block < DATA_START) {
            this.filesChanged = true;
        }
    }

    private blockForWrite(block: number): Uint8Array {
        let data = this.blocks.get(block);
        if (!data) {
            data = new Uint8Array(BLOCK_SIZE);
            this.blocks.set(block, data);
        }
        return data;
    }

    // --- FAT16 formatting --------------------------------------------------------------

    /** Builds an empty FAT16 volume with README.TXT in the root directory. */
    private format() {
        this.blocks.clear();

        // Boot sector / BIOS parameter block
        const boot = this.blockForWrite(0);
        const view = new DataView(boot.buffer);
        boot.set([0xEB, 0x3C, 0x90], 0);
        boot.set(SDCard.ascii("MSDOS5.0"), 3);
        view.setUint16(11, BLOCK_SIZE, true);
        boot[13] = SECTORS_PER_CLUSTER;
        view.setUint16(14, RESERVED_SECTORS, true);
        boot[16] = FAT_COUNT;
        view.setUint16(17, ROOT_ENTRIES, true);
        view.setUint16(19, 0, true);               // total sectors in the 32-bit field below
        boot[21] = 0xF8;                            // fixed disk
        view.setUint16(22, SECTORS_PER_FAT, true);
        view.setUint16(24, 63, true);
        view.setUint16(26, 255, true);
        view.setUint32(28, 0, true);
        view.setUint32(32, TOTAL_BLOCKS, true);
        boot[36] = 0x80;
        boot[38] = 0x29;
        view.setUint32(39, 0x41444152, true);
        boot.set(SDCard.ascii("ADARC SD   "), 43);
        boot.set(SDCard.ascii("FAT16   "), 54);
        boot[510] = 0x55;
        boot[511] = 0xAA;

        // README.TXT occupies cluster 2
        const readme = SDCard.ascii(README_TEXT);
        const readmeCluster = 2;

        for (let f = 0; f < FAT_COUNT; f++) {
            const fat = new DataView(this.blockForWrite(FAT_START + f * SECTORS_PER_FAT).buffer);
            fat.setUint16(0, 0xFFF8, true);          // media descriptor
            fat.setUint16(2, 0xFFFF, true);          // reserved
            fat.setUint16(readmeCluster * 2, 0xFFFF, true); // end of chain
        }

        // Root directory: volume label + README.TXT
        const root = this.blockForWrite(ROOT_DIR_START);
        root.set(SDCard.ascii("ADARC SD   "), 0);
        root[11] = 0x08;                             // volume label
        const entry = 32;
        root.set(SDCard.ascii("README  TXT"), entry);
        root[entry + 11] = 0x20;                     // archive
        const rootView = new DataView(root.buffer);
        const fatDate = ((2026 - 1980) << 9) | (1 << 5) | 1;
        rootView.setUint16(entry + 14, 0, true);
        rootView.setUint16(entry + 16, fatDate, true);
        rootView.setUint16(entry + 18, fatDate, true);
        rootView.setUint16(entry + 22, 0, true);
        rootView.setUint16(entry + 24, fatDate, true);
        rootView.setUint16(entry + 26, readmeCluster, true);
        rootView.setUint32(entry + 28, readme.length, true);

        const firstBlock = DATA_START + (readmeCluster - 2) * SECTORS_PER_CLUSTER;
        this.blockForWrite(firstBlock).set(readme, 0);
    }

    /** Prints the root directory to the browser console (helpful when testing). */
    private logFiles() {
        const files: string[] = [];
        for (let b = ROOT_DIR_START; b < DATA_START; b++) {
            const block = this.blocks.get(b);
            if (!block) {
                continue;
            }
            for (let e = 0; e < BLOCK_SIZE; e += 32) {
                const first = block[e];
                const attr = block[e + 11];
                if (first === 0x00 || first === 0xE5 || (attr & 0x08) || (attr & 0x10)) {
                    continue;
                }
                const name = String.fromCharCode(...block.subarray(e, e + 8)).trim();
                const ext = String.fromCharCode(...block.subarray(e + 8, e + 11)).trim();
                const size = new DataView(block.buffer).getUint32(e + 28, true);
                files.push(`${name}${ext ? "." + ext : ""} (${size} bytes)`);
            }
        }
        console.log("Virtual SD card files:", files.join(", ") || "(empty)");
    }

    private static ascii(text: string): Uint8Array {
        const bytes = new Uint8Array(text.length);
        for (let i = 0; i < text.length; i++) {
            bytes[i] = text.charCodeAt(i) & 0x7F;
        }
        return bytes;
    }
}
