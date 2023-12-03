import { runCode } from "main";

export namespace interopManager {

    export class InteropManager {

        startCodeLoop(wrapper: any) {
            runCode();
        }

        getWindowWidth(): number {
            return window.innerWidth;
        }

        updateCodeInPane(code: string) {
            monaco.editor.getModels[0].setValue(code);
        }

        getCodeInPane(): string {
            return monaco.editor.getModels[0].getValue();
        }









    }

    
    export function getInteropManager(): InteropManager {
        return new InteropManager();
    }
}