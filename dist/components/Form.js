import BaseCompoent from "./BaseComponent.js";
export default class Form extends BaseCompoent {
    constructor(root) {
        super();
        this.formContainer = document.createElement("div");
        this.formContainer.setAttribute("class", "form_container");
        this.formElement = document.createElement("form");
        this.formContainer.appendChild(this.formElement);
        root === null || root === void 0 ? void 0 : root.appendChild(this.formContainer);
        this.render(this.formElement);
    }
    render(form) {
        form.innerHTML =
            `
                <fieldset >
                    <legend>Registartion Form</legend>
                    <div class="input_box_div">
                        <label for="full_name">Full name</label>
                        <input type="text" id="full_name" class="input_box>     
                    </div>
                    <div class="input_box_div">
                        <label for="email">Email</label>
                        <input type="text" id="email" class="input_box">     
                    </div>
                    <div class="input_box_div">
                        <label for="contact">Contact</label>
                        <input type="text" id="contact" class="input_box>     
                    </div>
                </fieldset>
                <button class="btn submit">Submit</button>  `;
    }
}
