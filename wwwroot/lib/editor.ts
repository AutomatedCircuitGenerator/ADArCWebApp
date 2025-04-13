import {DiffMatchPatch, Diff} from "@lib/diff-match-patch-ts";
let loadValue: string = null;
let deleteValue: string = null;
let tValue:string = null;
let diffValue = [];
let remeberVal = [];
namespace differenceEditor {
    function getlineNum(text1: string, text2: string) {
        const a = text1.split('\n');
        const b = text2.split('\n');
        let count = 0;
        
        for(let i = 0; i < b.length; i++){
            if(a[i] !== b[i]){
                if(remeberVal.includes(i+1)){
                    count++;
                }
                else{
                    count = 0;
                    remeberVal.push(i+1)
                    return i+1;
                }
            }
        }
        
    }
        
    function difference(string1,string2){
        let dmp = new DiffMatchPatch();
        const diff : Diff[] = dmp.diff_main(string1, string2);
        dmp.diff_cleanupSemantic(diff);
        
        //This changes the original interface of dmp. As it was the operation and line change. 
        // [-1] - Deleted; [0] - equal to each other; [1] - insert
        interface Change {
            text: string;
            lineNumber:number;
        }
       
        let position1 = 0;
        let position2 = 0;

        // This was created in combination of examples online
        // We filter out all changes [0] operations as we don't need those for this application
        // we map the op and text for that operation. We then get a line number. Line number is a little buggy sometimes but this does work
        // as intended. Then we clean the text to get read of any /n characters. 
        const changesWithLines: Change[] = diff
            .filter(([op]) => op !== 0)
            .map(([op, text]) => {
                const lineNum = getlineNum(string1,string2);
                const clean = text.replace(/\n+/g, '\n');
                //if (op !== 1) position1 += text.length;
                //if (op !== -1) position2 += text.length;

                return { text: clean, lineNumber: lineNum };
            });
        console.log(changesWithLines);
        
        return(changesWithLines.filter(part => part[0] !== 0 && part[1] !== '\n'));
    }
         
   

    function compare() {
        if (deleteValue !== null && loadValue !== null) {
            diffValue = difference(loadValue, deleteValue);
        }
    }
    
    function tcompare(){
        if(tValue !== null && loadValue !==null){
            diffValue = difference(tValue, loadValue);
        }
    }
    export function myOnT(){
        var editor = monaco.editor.getModels()[0];
        tValue = editor.getValue();
        if(loadValue !== "\n" +
            "\n" +
            "\n" +
            "\n" +
            "void setup() {\n" +
            "\t// Initialize serial communication - allows printing to the console for debugging.\n" +
            "\tSerial.begin(9600);\n" +
            "}\n" +
            "\n" +
            "\n" +
            "void loop() {\n" +
            "\n" +
            "}\n" +
            "\n" +
            "\n" +
            " \n"){
            tcompare()
        }
        console.log(tValue); 
    }
    export function myOnLoad(){
        var editor = monaco.editor.getModels()[0];
        loadValue = editor.getValue();
        if(loadValue !== "\n" +
            "\n" +
            "\n" +
            "\n" +
            "void setup() {\n" +
            "\t// Initialize serial communication - allows printing to the console for debugging.\n" +
            "\tSerial.begin(9600);\n" +
            "}\n" +
            "\n" +
            "\n" +
            "void loop() {\n" +
            "\n" +
            "}\n" +
            "\n" +
            "\n" +
            " \n"){
        }
        console.log(loadValue);
    }
    
    export function myOnDelete(){
        var editor = monaco.editor.getModels()[0];
        deleteValue = editor.getValue();
        console.log(deleteValue);
        compare()
    }

    export function onAppend() {
        var editor = monaco.editor.getModels()[0];
        const edit = diffValue.map(diff =>{
            const range = new monaco.Range(diff.lineNumber,1,diff.lineNumber,1);
    
            return{
                range: range,
                text: diff.text + '\n',
                forceMoveMarkers: true,
            };
        })
        editor.applyEdits(edit);
    }
    
    export function deleteCache(){
        diffValue  = [];
    }

}

(window as any).differenceEditor = differenceEditor;