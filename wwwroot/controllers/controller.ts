// abstract class to define shared behavior for components
import {AVRRunner} from "@lib/execute";
import {DotNetObjectReference} from "@type-declarations/dotnet";
import {AVRIOPort} from "@lib/avr8js";
import {Pin, Port} from "@controllers/pin";

type SerializedPinItem = {
    item1: number,
    item2: string,
    item3: number,
}
    
export abstract class Controller {
    protected component: DotNetObjectReference;
    protected pins: { [canonicalPinName: string]: Pin[] }; // GraphSynth names as defined in ComponentNamespace.cs
    protected element: HTMLDivElement;
    
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
    cleanup(): void {};
    
    // this is called exclusively by the runner, and calls the components setup function
    // while also setting each of its pins
    init() {
        this.setup();
        
        for (const pins of Object.values(this.pins)) {
            pins.forEach((pin) => pin.setup());
        }
    }
    
    static create<T extends Controller>(this: new () => T, id: number, pins: { [canonicalPinName: string]: SerializedPinItem[] }, component: DotNetObjectReference): T {
        const instance = new this();
        instance.element = document.getElementById(`component-${id}`) as HTMLDivElement;
        
        const pinItems: { [canonicalPinName: string]: Pin[] } = {};

        for (const canonicalPinName in pins) {
            pinItems[canonicalPinName] = pins[canonicalPinName].map(serializedPin => (new Pin(serializedPin.item3, serializedPin.item2 as Port)));
        }
        
        instance.pins = pinItems;
        instance.component = component;
        return instance;
    }

    /**
     * Pauses execution, when awaited, until the specified number of cycles have passed.
     * @param {number} cycles - The number of cycles to wait.
     * @returns {Promise} A promise that resolves once the specified number of cycles have elapsed.
     */
    sleep(cycles: number): Promise<any> {
        return new Promise(resolve => {
            AVRRunner.getInstance().cpu.addClockEvent(() => resolve(void 0), cycles);
        });
    }
}