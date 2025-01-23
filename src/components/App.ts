import Form from "./Form.js";
import Table from "./Table.js";

export default class App{

    container:HTMLDivElement

    constructor(rootId:string){
        const root=document.getElementById(rootId);
        this.container=document.createElement("div");
        this.container.setAttribute("class","container")
        root?.append(this.container)
        
       this.render();
    }
    render(){
        const form=new Form(this.container);
        const table=new Table(this.container);

        document.querySelector(".submit")?.addEventListener("click",(e)=>{
            e.preventDefault();
            const FormsData=form.setter()
            table.setter(FormsData);
        })
    }
}
