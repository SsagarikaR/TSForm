import { forState } from "./Interface.js"
import { submitDone } from "./EventManager.js";

export default class StateManager{

    constructor(){

    }

    setStateOnSubmit(state:forState){
        state.form.full_name=(<HTMLInputElement>document.querySelector("#full_name")).value;
        state.form.email=(<HTMLInputElement>document.getElementById("email")).value;
        state.form.contact=(<HTMLInputElement>document.getElementById("contact")).value;
        state.form.password=(<HTMLInputElement>document.getElementById("password")).value;
        state.table[Object.keys(state.table).length]=state.form
        document.querySelectorAll("input").forEach((input)=>{
            input.value="";
        })
        document.dispatchEvent(submitDone);
    }

    setStateOnChange(state:forState){
        state.form.full_name=(<HTMLInputElement>document.querySelector("#full_name")).value;
        state.form.email=(<HTMLInputElement>document.getElementById("email")).value;
        state.form.contact=(<HTMLInputElement>document.getElementById("contact")).value;
        state.form.password=(<HTMLInputElement>document.getElementById("password")).value;
    }

    setStateOnEdit(state:forState,id:string){
        Object.keys(state.form).forEach((key)=>{
           state.form[key as keyof typeof state.form]=state.table[id][key as keyof typeof state.form];
        })
        console.log(state);
    }
}