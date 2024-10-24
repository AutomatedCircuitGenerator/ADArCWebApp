// abstract class to define shared behavior for components
import {AVRRunner} from "@lib/execute";
import {DotNetObjectReference} from "@type-declarations/dotnet";

export abstract class Controller {
    protected component: DotNetObjectReference;
    protected pins: { [key: string]: number[] };
    
    protected constructor() {
        AVRRunner.getInstance().addController(this);
    }

    delete() {
        AVRRunner.getInstance().removeController(this);
    }
    
    // this is called once every time the code is executed, usually used to attach listeners to various ports/interfaces
    abstract setup(): void;
    // this is called before setup, and should reset the internal state of the controller (registers, etc.) before each execution
    abstract reset(): void;
    // this is called in between reset and setup, and gets the updated pins from the ComponentInstance on the frontend
    async updatePins() {
        this.pins = await this.component.invokeMethodAsync("GetPins");
    }
    
    static create<T extends Controller>(this: new () => T, pins: Record<string, number[]>, component: DotNetObjectReference): T {
        const instance = new this();
        instance.pins = pins;
        instance.component = component;
        return instance;
    }
}