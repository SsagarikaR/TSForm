import Form from "./Form.js";
import Table from "./Table.js";
export default class App {
    constructor(rootId) {
        const root = document.getElementById(rootId);
        this.container = document.createElement("div");
        this.container.setAttribute("class", "container");
        root === null || root === void 0 ? void 0 : root.append(this.container);
        new Form(this.container);
        new Table(this.container);
    }
}
