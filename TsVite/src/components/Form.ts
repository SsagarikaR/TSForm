import BaseCompoent from "./BaseComponent.js";
import {ForFormData,forState} from "./Interface.js"
import { submitEvent,updateEvent} from "./EventManager.js";
import { Validations } from "./Validations.js";

export default class Form extends BaseCompoent{
    private static instance:Form;
    private validation:Validations;
    formContainer:HTMLDivElement
    formElement:HTMLFormElement

    private constructor(root:HTMLElement | null){
        super();

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

    render(valueData:forState): void {
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
                            <input type="password" id="Rpassword" class="input_box require" >
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
                        <div class="input_box_div require_div">
                            <input type="checkbox" id="agree">
                            <label for="agree" class="agree_label">I agree to the <a href="#">Terms&Conditions</a></label>
                        </div>
                        
                    </div> 
                    <button class="btn submit">Create account</button> 
                    <button class="btn update hide">Update</button>  `;
        
        this.triggerEvents();
        
    }

    triggerEvents(){
        document.querySelector(".submit")?.addEventListener('click',(e)=>{
            e.preventDefault();
            document.dispatchEvent(submitEvent);
            // document.dispatchEvent(new CustomEvent("submitEvent"));
        })

        document.querySelector(".update")?.addEventListener('click',(e)=>{
            e.preventDefault();
            // console.log("update triggereed")
            document.dispatchEvent(updateEvent);
        })

        document.querySelectorAll("input").forEach((input)=>{
            input.addEventListener("input",()=>{
                console.log("input changed")
                console.log(input.id);
                const message=this.validation.checkError(input.id,input.value)
                console.log(message,"message");
                const parents = input.closest(".input_box_div");
                console.log(parents?.closest(".error"))
                if(parents?.children[2]){
                   parents.children[2].textContent=message
                }
               else{
                    const errorMessage=document.createElement("div")
                    errorMessage.textContent=message;
                    errorMessage.classList.add("error")
                    parents?.append(errorMessage);
               }
              
            })
        })
    }

}