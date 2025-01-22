import Form from "./Form.js";
import Table from "./Table.js";

export default class App{
    container:HTMLDivElement

    constructor(rootId:string){
        const root=document.getElementById(rootId);
        this.container=document.createElement("div");
        this.container.setAttribute("class","container")
        root?.append(this.container)
        new Form(this.container);
        new Table(this.container);
    }
}
