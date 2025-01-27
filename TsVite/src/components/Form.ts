import BaseCompoent from "./BaseComponent.js";
import {ForFormData,forState} from "./Interface.js";
import Notification from "./Notification.js";
import { Validations } from "./Validations.js";

export default class Form extends BaseCompoent{
    private static instance:Form;
    private notification:Notification;
    private validation:Validations;
    private data:ForFormData;
    private id:string;
    private errorMessage:string;
    formContainer:HTMLDivElement
    formElement:HTMLFormElement

    private constructor(root:HTMLElement | null){
        super();
        this.notification=Notification.getInstance(root);
        this.errorMessage="";
        this.id="";
        this.data={
            full_name:"",
            email:"",
            contact:"",
            password:"",
            college:""
        }

        this.formContainer=document.createElement("div");
        this.formContainer.setAttribute("class","form_container");
        this.formElement=document.createElement("form");
        this.formContainer.appendChild(this.formElement);
        root?.appendChild(this.formContainer);

        this.validation=Validations.getInstance();
    }

    static getInstance(root:HTMLElement | null):Form{
        if(!Form.instance){
            Form.instance=new Form(root);
        }
        return  Form.instance;
    }

    render(state:forState): void {
        // console.log(valueData)
        this.formElement.innerHTML=
                `
                    <h2>Create your account</h2>
                    <div class="inputs_container">
                        <div class="input_box_div require_div">
                            <label for="full_name">Full name: <span class="required">*</span></label>
                            <input type="text" id="full_name" class="input_box require" >     
                        </div>
                        <div class="input_box_div require_div">
                            <label for="email">Email: <span class="required">*</span></label>
                            <input type="text" id="email" class="input_box require">     
                        </div>
                        <div class="input_box_div require_div">
                            <label for="contact">Contact: <span class="required">*</span></label>
                            <input type="text" id="contact" class="input_box require" >     
                        </div>
                        <div class="input_box_div require_div">
                            <label for="password">Password: <span class="required">*</span></label>
                           <input type="password" id="password" class="input_box require" > 
                        </div>
                        <div class="input_box_div require_div">
                            <label for="Rpassword">Retype password: <span class="required">*</span></label>
                            <input type="password" id="Rpassword" class="input_box " >
                        </div>
                        <div class="input_box_div ">
                            <label for="name">College: </label>
                            <input list="College" id="college" name="college" class="input_box "/>
                            <datalist id="College"  >
                                <option value="DRIEMS">DRIEMS</option>
                                <option value="Silicon">Silicon</option>
                                <option value="KIIT">KIIT</option>
                                <option value="IIIT">IIIT</option>
                                <option value="IIT">IIT</option>
                                <option value="ITER">ITER</option>
                            </datalist>
                        </div >
                        <div class="input_box_div require_div agree_div">
                            <input type="checkbox" id="agree" class="require">
                            <label for="agree" class="agree_label">I agree to the <a href="#">Terms&Conditions</a></label>
                        </div>
                        
                    </div> 
                    <button class="btn submit">Create account</button> 
                    <button class="btn update hide">Update</button>  `;
        
        this.triggerEvents(state);
        
    }
 
    triggerEvents(state:forState){

        document.addEventListener("PassEditData",(e:Event)=>{
           this.id=(e as CustomEvent).detail.id
           const submit=<HTMLButtonElement>document.querySelector(".submit");
           const update=<HTMLButtonElement>document.querySelector(".update");
           submit.classList.add("hide");
           update.classList.remove("hide");
           (<HTMLInputElement>document.querySelector("#full_name")).value=state.table[this.id].full_name;
           (<HTMLInputElement>document.getElementById("email")).value=state.table[this.id].email;
           (<HTMLInputElement>document.getElementById("contact")).value=state.table[this.id].contact;
           (<HTMLInputElement>document.getElementById("password")).value=state.table[this.id].password;
           (<HTMLInputElement>document.getElementById("college")).value=state.table[this.id].college;

        })

        document.querySelector(".submit")?.addEventListener('click', (e) => {
            e.preventDefault();
            this.setData();
            console.log((<HTMLInputElement>document.querySelector("#agree")).value);
            if (this.isDataValid()) {
              document.dispatchEvent(new CustomEvent("submitEvent", { detail: { data: this.data } }));
              this.notification.render("Submitted Successfully");
            }
          })

        document.querySelector(".update")?.addEventListener('click',(e)=>{
            e.preventDefault();
            this.setData();
            console.log((<HTMLInputElement>document.querySelector("#agree")).value);
            if (this.isDataValid()) {
                document.dispatchEvent(new CustomEvent("updateEvent",{detail:{data:this.data, id:this.id}}));
                this.notification.render("Updated Successfully");
            }
        })

        document.querySelectorAll(".require").forEach((input)=>{
            input.addEventListener("input",()=>{
                this.errorMessage=this.validation.checkError(input.id,(<HTMLInputElement>input).value)
                // console.log(message,"message");
                const parents = input.closest(".input_box_div");
                // console.log(parents?.closest(".error"))
                if(parents?.children[2]){
                   parents.children[2].textContent=this.errorMessage
                }
               else{
                    const errorMessage=document.createElement("div")
                    errorMessage.textContent=this.errorMessage;
                    errorMessage.classList.add("error")
                    parents?.append(errorMessage);
               }
              
            })
        })
    }

    isDataValid(): boolean {
        let isValid = true;
        document.querySelectorAll(".require").forEach((input) => {
            const errorMessage = this.validation.checkError(input.id, (<HTMLInputElement>input).value);
            if (errorMessage !== "") {
                isValid = false;
                const parents = input.closest(".input_box_div");
                if (parents?.children[2]) {
                    parents.children[2].textContent = errorMessage;
                } 
                else{
                    const errorMessageDiv = document.createElement("div");
                    errorMessageDiv.textContent = errorMessage;
                    errorMessageDiv.classList.add("error");
                    input.id==="agree" ? errorMessageDiv.classList.add("agree-error"):" ";
                    parents?.append(errorMessageDiv);
                }
            }
        });
        return isValid;
    }

    setData(){
        this.data.full_name=(<HTMLInputElement>document.querySelector("#full_name")).value;
        this.data.email=(<HTMLInputElement>document.getElementById("email")).value;
        this.data.contact=(<HTMLInputElement>document.getElementById("contact")).value;
        this.data.password=(<HTMLInputElement>document.getElementById("password")).value;
        this.data.college=(<HTMLInputElement>document.getElementById("college")).value;
    }

}