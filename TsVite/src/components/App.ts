import Form from "./Form.js";
import Table from "./Table.js";
import BaseCompoent from "./BaseComponent.js";
import StateManager from "./StateManager.js";
import { forState } from "./Interface.js"

export default class App extends BaseCompoent{

    state:forState;
    private form:Form;
    private table:Table;
    private stateManager:StateManager;
    private static instance:App;

    private constructor(root:HTMLElement | null){
        super();
        this.form=Form.getInstance(root);
        this.table=Table.getInstance(root);
        this.stateManager=StateManager.getInstance();

        this.state={
            form:{
                full_name:"",
                email:"",
                contact:"",
                password:"",
                college:""
            },
            table:{},
        }

        this.render();
        this.TriggerStateManager();
    }

    static getInstance(root:HTMLElement | null):App{
        if(!App.instance){
            App.instance=new App(root);
        }
        return  App.instance;
    }

    render(){
        this.form.render(this.state);
        this.table.render(this.state.table);
    }

    TriggerStateManager(){

        document.addEventListener("submitEvent",()=>{
            this.stateManager.setStateOnSubmit(this.state);
        })

        document.addEventListener("editEvent",(e:Event)=>{
            const id=(e as CustomEvent).detail.id;
            this.stateManager.setStateOnEdit(this.state,id);
        })

        document.addEventListener("updateEvent",()=>{
            this.stateManager.setStateOnUpdate(this.state);
        })

        document.addEventListener("deleteEvent",(e:Event)=>{
            this.stateManager.setStateOnDelete(this.state,(e as CustomEvent).detail.id)
        })


        document.addEventListener("submitOrDelDone",()=>{
            this.table.render(this.state.table);
        })

        document.addEventListener("editReady",()=>{
            this.form.render(this.state);
            const submit=<HTMLButtonElement>document.querySelector(".submit");
            const update=<HTMLButtonElement>document.querySelector(".update");
            submit.classList.add("hide");
            update.classList.remove("hide")
        })

        document.addEventListener("updateDone",()=>{
            this.table.render(this.state.table);
            const submit=<HTMLButtonElement>document.querySelector(".submit");
            const update=<HTMLButtonElement>document.querySelector(".update");
            submit.classList.add("hide");
            update.classList.remove("hide")
        })
        document.addEventListener("stateChanged",()=>{
            this.render();
        })

    }
}
