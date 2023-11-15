import { runCode } from "main";

export namespace interopManager {

    export class InteropManager {

        startCodeLoop(wrapper: any) {
            runCode();
        }

        getWindowWidth(): number {
            return window.innerWidth;
        }












    }

    
    export function getInteropManager(): InteropManager {
        return new InteropManager();
    }
}