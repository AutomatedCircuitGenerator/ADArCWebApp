import {Controller} from "@controllers/controller";

export class DE2120 extends Controller {
    private _encodedValue: number;
    
    override update(state: Record<string, any>) {
        this.setEncodedValue(0);
    }
    
    setEncodedValue = (encodedValue: number) => {
        this._encodedValue = encodedValue;
    }
    
    setup() {
    }
}