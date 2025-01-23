import Form from "./Form.js";
import Table from "./Table.js";
import BaseCompoent from "./BaseComponent.js";
import StateManager from "./StateManager.js";
import {ForFormData, ForTableData, forState } from "./Interface.js"

export default class App extends BaseCompoent{

    state:forState
    private form:Form;
    private table:Table;
    private stateManager:StateManager

    constructor(root:HTMLElement | null){
        super();
        // const root=document.getElementById(rootId);
        // this.container=document.createElement("div");
        // this.container.setAttribute("class","container")
        // root?.append(this.container)
        this.form=new Form(root);
        this.table=new Table(root);
         this.stateManager=new StateManager();

        this.state={
            form:{
                full_name:"",
                email:"",
                contact:"",
                password:""
            },
            table:{},
        }
        this.render();
        this.TriggerStateManager();
    }

    render(){
        this.form.render(this.state.form);
        this.table.render(this.state.table);
        // this.form.onSubmit(this.state.OnSubmit);
        // this.table.onEdit(this.state.OnEdit);
    }

    TriggerStateManager(){
        document.addEventListener("submitEvent",()=>{
            console.log("submitEvent");
            this.stateManager.setStateOnSubmit(this.state);
        })

        document.addEventListener("editEvent",()=>{
            // this.stateManager.setStateOnSubmit(this.state);
        })
        document.addEventListener("submitDone",()=>{
            console.log(this.state.table),"submitDone";
            this.table.render(this.state.table);
        })
    }
}
