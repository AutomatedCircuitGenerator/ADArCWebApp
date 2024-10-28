// abstract class to define shared behavior for components
import {AVRRunner} from "@lib/execute";
import {DotNetObjectReference} from "@type-declarations/dotnet";
import {AVRIOPort} from "@lib/avr8js";

type PinItem = {
    absolutePort: number;
    portRegion: string;
    relativePort:number;
}

type SerializedPinItem = {
    item1: number,
    item2: string,
    item3: number,
}
    
export abstract class Controller {
    protected component: DotNetObjectReference;
    protected pins: { [canonicalPinName: string]: PinItem[] };
    protected element: HTMLDivElement;
    
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
    
    static create<T extends Controller>(this: new () => T, id: number, pins: { [canonicalPinName: string]: SerializedPinItem[] }, component: DotNetObjectReference): T {
        const instance = new this();
        instance.element = document.getElementById(`component-${id}`) as HTMLDivElement;
        
        const pinItems: { [canonicalPinName: string]: PinItem[] } = {};

        for (const canonicalPinName in pins) {
            pinItems[canonicalPinName] = pins[canonicalPinName].map(serializedPin => ({
                absolutePort: serializedPin.item1,
                portRegion: serializedPin.item2,
                relativePort: serializedPin.item3
            }));
        }
        
        console.log(pinItems);
        
        instance.pins = pinItems;
        instance.component = component;
        return instance;
    }
    
    protected static item2toAVRIOPort(port:string){
        switch(port) {
            case "B":
                return AVRRunner.getInstance().portB;
            case "C":
                return AVRRunner.getInstance().portC;
            case "D" :
                return AVRRunner.getInstance().portD;
            default:
                return null;
        }
    }
}