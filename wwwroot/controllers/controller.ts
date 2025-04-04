// abstract class to define shared behavior for components
import {AVRRunner} from "@lib/execute";
import {DotNetObjectReference} from "@type-declarations/dotnet";
import {Interfaces} from "../boards/board";

export abstract class Controller {
    protected component: DotNetObjectReference;
    protected pins: { [canonicalPinName: string]: Interfaces[] } = {};
    protected id: number;
    protected pinIndices: { [canonicalPinName: string]: number[] };
    
    protected get element() {
        return document.getElementById(`component-${this.id}`) as HTMLDivElement;
    }

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
    }
    
    // this is called exclusively by C# to send raw a raw JSON string before it is parsed and sent to update.
    // you should probably not ever have to call it from JS.
    send(state: string): void {
        const json = JSON.parse(state);
        this.update(json);
    }
    
    // this is called any time the environmental settings is updated. it will pass JSON to this function
    // which describes an updated state. by default, it does nothing as many components dont have env settings. however
    // for those that do, this needs to be overriden and implemented accordingly.
    update(state: Record<string, any>): void {
    }

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
        instance.id = id;
        instance.pinIndices = pins;
        instance.component = component;

        return instance;
    }
}