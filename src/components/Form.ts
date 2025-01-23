import BaseCompoent from "./BaseComponent.js";
interface ForFormData{
    full_name:string,
    email:string,
    contact:string,
    password:string
}

export default class Form extends BaseCompoent{
    formContainer:HTMLDivElement
    formElement:HTMLFormElement
    private FormsData:ForFormData={
        full_name:"",
        email:"",
        contact:"",
        password:""
    }

    constructor(root:HTMLElement | null){
        super();
        this.formContainer=document.createElement("div");
        this.formContainer.setAttribute("class","form_container");
        this.formElement=document.createElement("form");
        this.formContainer.appendChild(this.formElement);
        root?.appendChild(this.formContainer);
        
        this.render(this.formElement);
        this.setter();
    }

    render(form:HTMLElement): void {
        form.innerHTML=
                `
                    <h2>Create your account</h2>
                    <div class="inputs_container">
                        <div class="input_box_div">
                            <label for="full_name">Full name</label>
                            <input type="text" id="full_name" class="input_box">     
                        </div>
                        <div class="input_box_div">
                            <label for="email">Email</label>
                            <input type="text" id="email" class="input_box">     
                        </div>
                        <div class="input_box_div">
                            <label for="contact">Contact</label>
                            <input type="text" id="contact" class="input_box">     
                        </div>
                        <div class="input_box_div">
                            <label for="password">Password</label>
                           <input type="password" id="password" class="input_box"> 
                        </div>
                        <div class="input_box_div">
                            <label for="Rpassword">Retype password</label>
                            <input type="password" id="Rpassword" class="input_box">
                        </div>
                        <div class="input_box_div">
                            <input type="checkbox" id="agree">
                            <label for="agree" class="agree_label">I agree to the <a href="#">Terms&Conditions</a></label>
                        </div>
                    </div> 
                    <button class="btn submit" ">Create account</button> 
                    <button class="btn update ">Update</button>  `;
    }

    setter():(ForFormData){
            this.FormsData.full_name=(<HTMLInputElement>document.getElementById("full_name")).value;
            this.FormsData.email=(<HTMLInputElement>document.getElementById("email")).value;
            this.FormsData.contact=(<HTMLInputElement>document.getElementById("contact")).value;
            this.FormsData.password=(<HTMLInputElement>document.getElementById("password")).value;
            document.querySelectorAll("input").forEach((input)=>{
                input.value="";
            })
            return this.FormsData
    }

}