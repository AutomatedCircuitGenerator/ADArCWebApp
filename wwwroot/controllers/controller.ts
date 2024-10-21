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
    
    abstract setup(): void;

    setComponentReference(component: DotNetObjectReference) {
        this.component = component;
    }

    static getReference<T extends Controller>(this: new () => T): T {
        return new this();
    }
}