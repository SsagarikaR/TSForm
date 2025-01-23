import Form from "./Form.js";
import Table from "./Table.js";
export default class App {
    constructor(rootId) {
        const root = document.getElementById(rootId);
        this.container = document.createElement("div");
        this.container.setAttribute("class", "container");
        root === null || root === void 0 ? void 0 : root.append(this.container);
        this.render();
    }
    render() {
        var _a;
        const form = new Form(this.container);
        const table = new Table(this.container);
        (_a = document.querySelector(".submit")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
            e.preventDefault();
            const FormsData = form.setter();
            table.setter(FormsData);
        });
    }
}
