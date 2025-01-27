import BaseComponent from "./BaseComponent";
import { forStateRecords } from "./Interface";
import Notification from "./Notification.js";

export class Restore extends BaseComponent{
    private static instance:Restore;
    private notification:Notification;
    private restoreContainer:HTMLDivElement;
    private key:string;

    private constructor(root:HTMLElement | null){
        super();
        this.notification=Notification.getInstance(root);
        this.restoreContainer=document.createElement("div");
        this.restoreContainer.classList.add("restoreContainer")
        root?.append(this.restoreContainer)
        this.key="";

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
                                        <div class="restore_container_hide  restore_container">
                                            <div class="restore_hide restore">
                                                ${Object.keys(stateRecords).map(key =>
                                                    `<div class="restore_message" data-key=${JSON.stringify( key)}><span class="create">Created at:</span> ${key}</div>`
                                                ).join('')}
                                            </div>
                                            <div class="restore_table_container_hide restore_table_container">
                                                <table class="restore_table">
                                                    <thead>
                                                        <tr>
                                                            <th>Full name</th>
                                                            <th>Email</th>
                                                            <th>Contact</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody class="tbody">
                                                    </tbody>
                                                </table>
                                                <div class="rstr_btn_container">
                                                    <button class="btn cancel">Cancel</button>
                                                    <button class="btn confirm">Confirm</button>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        `
                    
        this.setEvents(stateRecords);
    }
    showTable(stateRecords:forStateRecords,state_key:string){
        const table=document.querySelector(".restore_table")
        const tbody=document.querySelector(".tbody");
        tbody!.innerHTML="";
        stateRecords[state_key].table&&Object.keys( stateRecords[state_key].table).forEach((key)=>{
            // console.log(tableData);
            const newRow=(<HTMLTableElement>table).insertRow();
            newRow.setAttribute("id",key);
            newRow.insertCell().innerHTML= stateRecords[state_key].table[key].full_name;
            newRow.insertCell().innerHTML=stateRecords[state_key].table[key].email;
            newRow.insertCell().innerHTML= stateRecords[state_key].table[key].contact;
            const actionCell=newRow.insertCell()
            actionCell.classList.add("action");
            actionCell.innerHTML="<i class='fa fa-pencil-square-o edit' aria-hidden='true'></i> <i class='fa fa-trash delete' aria-hidden='true'></i>";
           tbody?.appendChild(newRow);
        })
    }

    setEvents(stateRecords:forStateRecords){
        const restore_button=document.querySelector(".restore_button");
        const restore_message=document.querySelectorAll(".restore_message");
        const restore_box=document.querySelector(".restore");
        const form_container=document.querySelector(".form_container");
        const table_container=document.querySelector(".table_container");
        const restore_container=document.querySelector(".restore_container");
        const restore_table_container=document.querySelector(".restore_table_container");
        const cancel=document.querySelector(".cancel");
        const confirm=document.querySelector(".confirm");

        restore_button?.addEventListener("click",(e)=>{
            e.preventDefault();
            if (Object.keys(stateRecords).length === 0){
                this.notification.render(`<i class="fa fa-exclamation no_data" aria-hidden="true"></i> No records yet`);
                return;
            }
            restore_container?.classList.add("restore_container_show")
            restore_container?.classList.remove("restore_container_hide")
            restore_box?.classList.add("restore_box")
            restore_box?.classList.remove("restore_hide")
            form_container?.classList.add("hide_form_container");
            table_container?.classList.add("hide_table_container");
        })

        restore_message.forEach((message)=>{
            message.addEventListener("click",(e)=>{
                e.preventDefault();
                restore_table_container?.classList.add("restore_table_container_show")
                restore_table_container?.classList.remove("restore_table_container_hide")
                this.key = message.getAttribute("data-key")!;
                this.showTable(stateRecords,this.key)
                console.log(this.key);
            })
        })
        cancel?.addEventListener("click",(e)=>{
            e.preventDefault();
            restore_table_container?.classList.remove("restore_table_container_show")
            restore_table_container?.classList.add("restore_table_container_hide")
            restore_container?.classList.remove("restore_container_show")
            restore_container?.classList.add("restore_container_hide")
            restore_box?.classList.remove("restore_box")
            restore_box?.classList.add("restore_hide")
            form_container?.classList.remove("hide_form_container");
            table_container?.classList.remove("hide_table_container");
        })
        confirm?.addEventListener("click",(e)=>{
            e.preventDefault();
            restore_table_container?.classList.remove("restore_table_container_show")
            restore_table_container?.classList.add("restore_table_container_hide")
            restore_container?.classList.remove("restore_container_show")
            restore_container?.classList.add("restore_container_hide")
            restore_box?.classList.remove("restore_box")
            restore_box?.classList.add("restore_hide")
            form_container?.classList.remove("hide_form_container");
            table_container?.classList.remove("hide_table_container");
            document.dispatchEvent(new CustomEvent("setRecord",{detail:{key:this.key}}))
            this.notification.render(`<i class="fa fa-check-circle" aria-hidden="true"></i> State changed successfully`);
        })
    }
}