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
    protected pins: { [canonicalPinName: string]: Pin[] };
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
    // this is called after the simulation is stopped, usually used to clean up lingering visual/audio before each execution
    abstract cleanup(): void;
    
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
}