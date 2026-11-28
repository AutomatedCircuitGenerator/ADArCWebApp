"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const execute_1 = require("@lib/execute");
class Controller {
    get element() {
        return document.getElementById(`component-${this.id}`);
    }
    constructor() {
        this.pins = {};
        execute_1.AVRRunner.getInstance().addController(this);
    }
    delete() {
        execute_1.AVRRunner.getInstance().removeController(this);
    }
    cleanup() {
    }
    send(state) {
        const json = JSON.parse(state);
        this.update(json);
    }
    update(state) {
    }
    init() {
        for (const [canonicalPinName, indices] of Object.entries(this.pinIndices)) {
            this.pins[canonicalPinName] = indices.map(index => execute_1.AVRRunner.getInstance().board.pins[index]);
        }
        this.setup();
    }
    static create(id, pins, component) {
        const instance = new this();
        instance.id = id;
        instance.pinIndices = pins;
        instance.component = component;
        return instance;
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map