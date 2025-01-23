import BaseCompoent from "./BaseComponent.js";
import {ForFormData} from "./Interface.js"
import { submitEvent,changeEvent} from "./EventManager.js";

export default class Form extends BaseCompoent{
    formContainer:HTMLDivElement
    formElement:HTMLFormElement

    constructor(root:HTMLElement | null){
        super();
        this.formContainer=document.createElement("div");
        this.formContainer.setAttribute("class","form_container");
        this.formElement=document.createElement("form");
        this.formContainer.appendChild(this.formElement);
        root?.appendChild(this.formContainer);
    }

    render(valueData:ForFormData): void {
        // console.log(valueData)
        this.formElement.innerHTML=
                `
                    <h2>Create your account</h2>
                    <div class="inputs_container">
                        <div class="input_box_div">
                            <label for="full_name">Full name</label>
                            <input type="text" id="full_name" class="input_box" value=${valueData.full_name}>     
                        </div>
                        <div class="input_box_div">
                            <label for="email">Email</label>
                            <input type="text" id="email" class="input_box" value=${valueData.email}>     
                        </div>
                        <div class="input_box_div">
                            <label for="contact">Contact</label>
                            <input type="text" id="contact" class="input_box" value=${valueData.contact}>     
                        </div>
                        <div class="input_box_div">
                            <label for="password">Password</label>
                           <input type="password" id="password" class="input_box" value=${valueData.password}> 
                        </div>
                        <div class="input_box_div">
                            <label for="Rpassword">Retype password</label>
                            <input type="password" id="Rpassword" class="input_box" value=${valueData.password}>
                        </div>
                        <div class="input_box_div">
                            <input type="checkbox" id="agree">
                            <label for="agree" class="agree_label">I agree to the <a href="#">Terms&Conditions</a></label>
                        </div>
                    </div> 
                    <button class="btn submit">Create account</button> 
                    <button class="btn update hide">Update</button>  `;
        
        document.querySelector(".submit")?.addEventListener('click',(e)=>{
            e.preventDefault();
            console.log((document.querySelector("#email") as HTMLInputElement).value)
            document.dispatchEvent(submitEvent);
        })

        document.querySelectorAll("input").forEach((input)=>{
            input.addEventListener("input",()=>{
                console.log(input.value)
                console.log((document.querySelector("#email") as HTMLInputElement).value)
                document.dispatchEvent(changeEvent)
            })
        })
        
    }

}