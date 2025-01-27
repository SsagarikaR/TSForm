import Form from "./Form.js";
import Table from "./Table.js";
import BaseCompoent from "./BaseComponent.js";
import StateManager from "./StateManager.js";
import { Restore } from "./Restore.js";
import { forState, forStateRecords } from "./Interface.js"

export default class App extends BaseCompoent{

    private static instance:App;
    private form:Form;
    private table:Table;
    private restore:Restore;
    private stateManager:StateManager;
    state:forState;
    stateRecords:forStateRecords

    private constructor(root:HTMLElement | null){
        super();
        this.form=Form.getInstance(root);
        this.table=Table.getInstance(root);
        this.restore=Restore.getInstance(root);
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
        this.stateRecords={};

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
        this.table.render(this.state);
        this.restore.render(this.stateRecords);
    }

    TriggerStateManager(){

        document.addEventListener("submitEvent",(e:Event)=>{
            this.stateManager.setState(this.stateRecords,this.state,(e as CustomEvent).detail.data);
        })

        document.addEventListener("editEvent",(e:Event)=>{
            document.dispatchEvent(new CustomEvent("PassEditData",{detail:{id:(e as CustomEvent).detail.id}}))
        })

        document.addEventListener("updateEvent",(e:Event)=>{
            this.stateManager.setState(this.stateRecords,this.state,(e as CustomEvent).detail.data,(e as CustomEvent).detail.id);
        })

        document.addEventListener("deleteEvent",(e:Event)=>{
            this.stateManager.setState(this.stateRecords,this.state,null,(e as CustomEvent).detail.id)
        })

        document.addEventListener("setRecord",(e:Event)=>{
            console.log(e,"clciked")
            this.stateManager.getState(this.stateRecords,this.state,(e as CustomEvent).detail.key);
        })

        document.addEventListener("stateChanged",()=>{
            this.render();
        })

    }
}
