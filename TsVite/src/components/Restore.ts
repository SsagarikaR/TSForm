import BaseComponent from "./BaseComponent";
import { forStateRecords } from "./Interface";

export class Restore extends BaseComponent{
    private static instance:Restore;
    private restoreContainer:HTMLDivElement;

    private constructor(root:HTMLElement | null){
        super();
        this.restoreContainer=document.createElement("div");
        this.restoreContainer.classList.add("restoreContainer")
        root?.append(this.restoreContainer)

    }

    static getInstance(root:HTMLElement | null):Restore{
        if(!Restore.instance){
            Restore.instance=new Restore(root);
        }
        return Restore.instance;
    }

    render(stateRecords:forStateRecords): void {
        this.restoreContainer.innerHTML=`
                                        <div class="restore_button ">Restore</div>
                                        <div class="restore_box">
                                            ${Object.keys(stateRecords).map(key =>
                                                `<div class="restore_message" data-key=${JSON.stringify( key)}>Created at: ${key}</div>`
                                            ).join('')}
                                        </div>`
                    
        this.setEvents();
    }

    setEvents(){
        document.querySelectorAll(".restore_message").forEach((message)=>{
            message.addEventListener("click",(e)=>{
                e.preventDefault();
                const key = message.getAttribute("data-key");
                console.log(key);
                document.dispatchEvent(new CustomEvent("setRecord",{detail:{key}}))

            })
        })
    }
}