let loadValue:string=null;
let deleteValue:string=null;
let diffValue = [];
function difference(string1, string2){
    const a = string1.split('\n');
    const b = string2.split('\n');
    const diff = [];
    
    for(let i = 0; i<a.length-1; i++){
        if(a[i] !== b[i]){
            if(a[i] !== b[i+1]){
                diff.push({lineNumber: i + 1, text: b[i+1]});
            }
            else{
                diff.push({lineNumber: i + 1, text: b[i]});
            }
        }
    }
    
    
    /*
    
    for(let i = 0; i < b.length+1; i++){
        if(a[i] !== b[i]){
            diff.push({lineNumber: i + 1, text: b[i]});
        }
    }
    console.log(diff);
    */
    return diff;
}

function onLoad(){
    var editor = monaco.editor.getModels()[0];
    loadValue = editor.getValue();
    console.log(loadValue);
}

function onDelete(){
    var editor = monaco.editor.getModels()[0];
    deleteValue = editor.getValue();
    console.log(deleteValue);
    compare()
}

function compare(){
    if (deleteValue !== null && loadValue !== null){
        diffValue = difference(loadValue, deleteValue);
    }
}
function onAppend() {
    var editor = monaco.editor.getModels()[0];
    const edit = diffValue.map(diff =>{
        const range = new monaco.Range(diff.lineNumber,1,diff.lineNumber,1);

        return{
            range: range,
            text: diff.text,
            forceMoveMarkers: true,
        };
    })
    editor.applyEdits(edit);
}

