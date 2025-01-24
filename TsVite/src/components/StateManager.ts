import { forState } from "./Interface.js"
import { submitOrDelDone,editReady, updateDone} from "./EventManager.js";

export default class StateManager{
    private static instance:StateManager
    private edit_id:string;
    // private delete_id:string;

    private constructor(){
        this.edit_id="";
        // this.delete_id="";
    }

    static getInstance():StateManager{
        if(!StateManager.instance){
            StateManager.instance=new StateManager();
        }
        return StateManager.instance;
    }

    setStateOnSubmit(state:forState){
        this.setStateOfForm(state);
        state.table[Object.keys(state.table).length]=state.form
        document.querySelectorAll("input").forEach((input)=>{
            input.value="";
        })
        document.dispatchEvent(submitOrDelDone);
    }

    setStateOnChange(state:forState){
       this.setStateOfForm(state);
    }

    setStateOnEdit(state:forState,id:string){
        this.edit_id=id;
        Object.keys(state.form).forEach((key)=>{
           state.form[key as keyof typeof state.form]=state.table[id][key as keyof typeof state.form];
        })
        // console.log(state,"state on edit click");
        document.dispatchEvent(editReady);
    }

    setStateOnUpdate(state:forState){
       this.setStateOfForm(state)
        state.table[this.edit_id]=state.form
        document.querySelectorAll("input").forEach((input)=>{
            input.value="";
        })
        document.dispatchEvent(updateDone);
    }

    setStateOnDelete(state:forState,id:string){
        // this.delete_id=id;
        delete state.table[id];
        document.dispatchEvent(submitOrDelDone);
    }

    setStateOfForm(state:forState){
        state.form.full_name=(<HTMLInputElement>document.querySelector("#full_name")).value;
        state.form.email=(<HTMLInputElement>document.getElementById("email")).value;
        state.form.contact=(<HTMLInputElement>document.getElementById("contact")).value;
        state.form.password=(<HTMLInputElement>document.getElementById("password")).value;
        state.form.college=(<HTMLInputElement>document.getElementById("college")).value;
    }

}