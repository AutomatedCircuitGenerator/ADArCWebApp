
import {Controller} from "@controllers/controller";
import {Interfaces} from "../boards/board";
import {PinState} from "@lib/avr8js";

export class pushButton extends Controller {

    private digitalOut?: Interfaces;
    private isPushed = false;
    private buttonCap: SVGElement | null = null;
    private activePointerId: number | null = null;
    private simulationStarted = false;

    setup(): void {
        this.digitalOut = this.pins.digital_out[0];

        this.applyState();
        this.bindWhenReady();

        this.simulationStarted = true;

        if (this.buttonCap) this.buttonCap.style.cursor = "pointer";
    }

    override cleanup(): void {
        this.simulationStarted = false;
        this.activePointerId = null;
        this.isPushed = false;

        if (this.buttonCap) {
            this.buttonCap.style.transform = "scale(1)";
            this.buttonCap.style.cursor = "default";
        }
        
        super.cleanup();
    }

    private bindWhenReady(attemptsLeft = 30): void {
        this.bindButtonEvents();

        if (!this.buttonCap && attemptsLeft > 0) requestAnimationFrame(() => this.bindWhenReady(attemptsLeft - 1));
    }

    private bindButtonEvents(): void {
        const cap = this.element?.querySelector<SVGElement>("#button-cap") ?? null;

        if (!cap || cap === this.buttonCap) return;

        this.unbindButtonEvents();
        this.buttonCap = cap;

        cap.style.cursor = "pointer";
        cap.style.touchAction = "none";
        cap.style.transformBox = "fill-box";
        cap.style.transformOrigin = "center";

        cap.addEventListener("pointerdown", this.handlePointerDown);
        cap.addEventListener("pointerup", this.handlePointerUp);
        cap.addEventListener("pointercancel", this.handlePointerCancel);
        cap.addEventListener("lostpointercapture", this.handlePointerCancel);
        
        cap.addEventListener("mousedown", this.stopCanvasMouseEvent);
        cap.addEventListener("mouseup", this.stopCanvasMouseEvent);
        cap.addEventListener("click", this.stopCanvasMouseEvent);
    }

    private unbindButtonEvents(): void {
        if (!this.buttonCap) return;

        const cap = this.buttonCap;

        cap.removeEventListener("pointerdown", this.handlePointerDown);
        cap.removeEventListener("pointerup", this.handlePointerUp);
        cap.removeEventListener("pointercancel", this.handlePointerCancel);
        cap.removeEventListener("lostpointercapture", this.handlePointerCancel);
        cap.removeEventListener("mousedown", this.stopCanvasMouseEvent);
        cap.removeEventListener("mouseup", this.stopCanvasMouseEvent);
        cap.removeEventListener("click", this.stopCanvasMouseEvent);

        this.buttonCap = null;
        this.activePointerId = null;
    }

    private stopCanvasMouseEvent = (event: MouseEvent): void => {
        if (!this.simulationStarted) return;

        event.stopPropagation();
    };

    private handlePointerDown = (event: PointerEvent): void => {
        if (event.button !== 0) return;

        if (!this.simulationStarted) return;

        event.preventDefault();
        event.stopPropagation();

        this.activePointerId = event.pointerId;
        this.buttonCap?.setPointerCapture(event.pointerId);
        this.setPushed(true);
    };

    private handlePointerUp = (event: PointerEvent): void => {
        if (event.pointerId !== this.activePointerId) return;

        event.stopPropagation();
        this.activePointerId = null;

        this.setPushed(false);

        if (this.buttonCap?.hasPointerCapture(event.pointerId)) this.buttonCap.releasePointerCapture(event.pointerId);
    };

    private handlePointerCancel = (event: PointerEvent): void => {
        if (event.pointerId !== this.activePointerId) return;

        event.stopPropagation();
        this.activePointerId = null;

        this.setPushed(false);
    };

    private setPushed(pushed: boolean): void {
        this.isPushed = pushed;
        this.applyState();
    }

    private applyState(): void {
        if (this.buttonCap) this.buttonCap.style.transform = this.isPushed ? "scale(0.94)" : "scale(1)";

        if (this.digitalOut?.digital) this.digitalOut.digital.state = this.isPushed ? PinState.Low : PinState.High;
    }
}
