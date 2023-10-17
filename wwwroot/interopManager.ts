import { runCode } from "main";

export namespace interopManager {

    export class InteropManager {

        startCodeLoop(wrapper: any) {
            runCode();
        }














    }

    
    export function getInteropManager(): InteropManager {
        return new InteropManager();
    }
}