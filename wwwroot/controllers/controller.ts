// abstract class to define shared behavior for components
import {AVRRunner} from "@lib/execute";
import {DotNetObjectReference} from "@type-declarations/dotnet";

export abstract class Controller {
    protected component: DotNetObjectReference;
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

    setComponentReference(component: DotNetObjectReference) {
        this.component = component;
    }

    static create<T extends Controller>(this: new () => T): T {
        return new this();
    }
}