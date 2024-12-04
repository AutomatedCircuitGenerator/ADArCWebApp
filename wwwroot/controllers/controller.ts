// abstract class to define shared behavior for components
import {AVRRunner} from "@lib/execute";
import {DotNetObjectReference} from "@type-declarations/dotnet";
import {Interfaces} from "../boards/board";

export abstract class Controller {
    protected component: DotNetObjectReference;
    protected pins: { [canonicalPinName: string]: Interfaces[] } = {};
    protected element: HTMLDivElement;
    protected pinIndices: { [canonicalPinName: string]: number[] };

    protected constructor() {
        AVRRunner.getInstance().addController(this);
    }

    delete() {
        AVRRunner.getInstance().removeController(this);
    }

    // this is called before the simulation is started, usually used to attach listeners to various ports/interfaces
    // and setup the controllers internal state with default values/0s
    abstract setup(): void;

    // this is called after the simulation is stopped, usually used to clean up lingering visual/audio before each execution.
    // by default, it does nothing and must be overriden, most components shouldn't need this unless they have a visual/audio
    // component
    cleanup(): void {
    };

    // this is called exclusively by the runner, and calls the components setup function
    // while also setting each of its pins
    init() {
        for (const [canonicalPinName, indices] of Object.entries(this.pinIndices)) {
            this.pins[canonicalPinName] = indices.map(index => AVRRunner.getInstance().board.pins[index]);
        }

        this.setup();
    }

    static create<T extends Controller>(this: new () => T, id: number, pins: {
        [canonicalPinName: string]: number[]
    }, component: DotNetObjectReference): T {
        const instance = new this();
        instance.element = document.getElementById(`component-${id}`) as HTMLDivElement;
        instance.pinIndices = pins;
        instance.component = component;

        return instance;
    }

    /**
     * when awaited, pauses execution of controller part until the specified number of cycles have passed.
     * @param {number} cycles - The number of cycles to wait.
     * @returns {Promise} A promise that resolves once the specified number of cycles have elapsed.
     */
    sleep(cycles: number): Promise<any> {
        return new Promise(resolve => {
            AVRRunner.getInstance().board.cpu.addClockEvent(() => resolve(void 0), cycles);
        });
    }
}