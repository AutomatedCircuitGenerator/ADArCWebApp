import { Controller } from "./controller";
import { AVRRunner } from "@lib/execute";

export class GPS extends Controller {

    private _latitude: number = 20.0;
    private _longitude: number = 40.0;

    override update(state: Record<string, any>) {
        if (typeof state.latitude === "number") {
            this._latitude = state.latitude;
        }

        if (typeof state.longitude === "number") {
            this._longitude = state.longitude;
        }
    }

    setup() {
        AVRRunner.getInstance().board.cpu.addClockEvent(
            () => this.sendSerialNMEA(),
            1000000
        );
    }

    private sendSerialNMEA() {
        const runner = AVRRunner.getInstance();
        const usart = runner.board.usarts[0];
        
        // debug
        if(!usart) {
            console.error("No USART found");
        } else {
            console.log("Sending NMEA sentence");
        }
        
        const sentence = this.generateGPRMC(this._latitude, this._longitude);
        console.log("Generated NMEA sentence:", sentence);

        // push byte into usart
        for (let i = 0; i < sentence.length; i++) {
            const byte = sentence.charCodeAt(i);
            const accepted = usart.writeByte(byte, false);
            
            console.log(`Sent byte ${byte} to USART. Accepted: ${accepted}`);
        }

        // push terminating chars
        usart.writeByte(13, true); // \r
        usart.writeByte(10, true); // \n

        // re-run sendSerialNMEA
        runner.board.cpu.addClockEvent(
            () => this.sendSerialNMEA(),
            1000000
        );
    }

    private generateGPRMC(lat: number, lon: number): string {
        const latDir = lat >= 0 ? "N" : "S";
        const lonDir = lon >= 0 ? "E" : "W";

        // deg to NMEA DDMM.MMMM
        const formatCoord = (coord: number, isLat: boolean) => {
            const absolute = Math.abs(coord);
            const degrees = Math.floor(absolute);
            const minutes = (absolute - degrees) * 60;
            const degreeString = degrees.toString().padStart(isLat ? 2 : 3, "0");
            return `${degreeString}${minutes.toFixed(4)}`;
        };

        const time = "120000"; // placeholder timestamp (12:00 utc)
        const latStr = formatCoord(lat, true);
        const lonStr = formatCoord(lon, false);

        const payload = `GPRMC,${time},A,${latStr},${latDir},${lonStr},${lonDir},000.0,000.0,080426,,,A`;

        // xor checksum for NMEA standards
        let checksum = 0;
        for (let i = 0; i < payload.length; i++) {
            checksum ^= payload.charCodeAt(i);
        }

        return `$${payload}*${checksum.toString(16).toUpperCase().padStart(2, "0")}`;
    }
}

/* use this code in the sim code panel -- refraining for now on changing codeForGen in ComponentNamescpace.ts
#include <Arduino.h>

void setup() {
    Serial.begin(9600);
}

void loop() {
  int bytesWaiting = Serial.available();
  
  if (bytesWaiting > 0) {
    char incomingByte = Serial.read();
    
    Serial.print(incomingByte);
  }
}
 */