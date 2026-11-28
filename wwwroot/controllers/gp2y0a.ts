import {Controller} from "@controllers/controller";

/**
 * Sharp GP2Y0A21YK0F / GP2Y0A02YK0F analog infrared distance sensor.
 *
 * Output voltage on Vo is roughly inversely proportional to distance. The transfer
 * curves are power-law fits of the datasheet curves:
 *   GP2Y0A21YK0F (10–80 cm):  d = 27.728 * V^-1.2045
 *   GP2Y0A02YK0F (20–150 cm): d = 61.573 * V^-1.1068
 * Inverting gives V = (k / d)^(1 / e).
 */
interface SharpModel {
    k: number;
    e: number;
    minCm: number;
    maxCm: number;
}

const MODELS: Record<string, SharpModel> = {
    "GP2Y0A21YK0F": {k: 27.728, e: 1.2045, minCm: 10, maxCm: 80},
    "GP2Y0A02YK0F": {k: 61.573, e: 1.1068, minCm: 20, maxCm: 150},
};

const DEFAULT_MODEL = "GP2Y0A21YK0F";

export class GP2Y0A extends Controller {
    private model: string = DEFAULT_MODEL;
    private distance: number = 30;
    private inSimulation: boolean = false;

    override update(state: Record<string, any>) {
        if (state.model !== undefined && state.model in MODELS) {
            this.model = state.model;
        }
        if (state.distance !== undefined) {
            this.distance = Number(state.distance);
        }
        this.applyVoltage();
    }

    setup() {
        this.inSimulation = true;
        this.applyVoltage();
    }

    static distanceToVoltage(model: string, distanceCm: number): number {
        const m = MODELS[model] ?? MODELS[DEFAULT_MODEL];
        // The sensor's output is only meaningful within its rated range.
        const d = Math.min(m.maxCm, Math.max(m.minCm, distanceCm));
        const voltage = Math.pow(m.k / d, 1 / m.e);
        return Math.min(5, Math.max(0, voltage));
    }

    private applyVoltage() {
        if (!this.inSimulation || !this.pins.vo || !this.pins.vo[0]) {
            return;
        }
        this.pins.vo[0].analog.voltage = GP2Y0A.distanceToVoltage(this.model, this.distance);
    }
}
