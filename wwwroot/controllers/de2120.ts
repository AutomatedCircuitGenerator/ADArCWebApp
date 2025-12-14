import {Controller} from "@controllers/controller";

export class DE2120 extends Controller {
    private _encodedvalue: number;
    
    override update(state: Record<string, any>) {
        this.setencodedvalue(0);
    }
    
    setencodedvalue = (encodedvalue: number) => {
        this._encodedvalue = encodedvalue;
    }
    
    setup() {
    }
}