import BaseCompoent from "./BaseComponent.js";
import {ForTableData} from "./Interface.js"
import { editEvent } from "./EventManager.js";


export default class Table extends BaseCompoent{
    tableContainer:HTMLDivElement
    tableElement:HTMLTableElement

    constructor(root:HTMLElement | null){
        super();
        this.tableContainer=document.createElement("div");
        this.tableContainer.setAttribute("class","table_container")
        this.tableElement=document.createElement("table");
        this.tableContainer.appendChild(this.tableElement);
        root?.appendChild(this.tableContainer) 
    }

    render(tableData:ForTableData): void {
        this.tableElement.innerHTML=
                `
                <tr>
                   <th>Full name</th>
                   <th>Email</th>
                   <th>Contact</th>
                   <th>Action</th>
                </tr>
                `;

        tableData&&Object.keys(tableData).forEach((key)=>{
            console.log(tableData);
            console.log('tableData:', tableData);
console.log('tableData[key]:', tableData[key]);
console.log('Object.keys(tableData[key]):' ,Object.keys(tableData[key]));
            const newRow=(<HTMLTableElement>this.tableElement).insertRow();
            newRow.setAttribute("id",key);
            newRow.insertCell().innerHTML=tableData[key as keyof typeof tableData].full_name;
            newRow.insertCell().innerHTML=tableData[key].email;
            newRow.insertCell().innerHTML=tableData[key].contact;
            const actionCell=newRow.insertCell()
            actionCell.classList.add("action");
            actionCell.innerHTML="<i class='fa fa-pencil-square-o edit' aria-hidden='true'></i> <i class='fa fa-trash delete' aria-hidden='true'></i>";
        })

        const edit_button=document.querySelectorAll(".edit");
        edit_button.forEach((edit)=>{

            edit.addEventListener("click",(e)=>{
                e.preventDefault();
                const submit=<HTMLButtonElement>document.querySelector(".submit");
                const update=<HTMLButtonElement>document.querySelector(".update");
                submit.classList.add("hide");
                update.classList.remove("hide")
                console.log(submit,update)
                document.dispatchEvent(editEvent);
            })
        })
    }

    onEdit(setState:(id:string)=>void){
        const edit_button=document.querySelectorAll(".edit");
        // console.log(edit_button)
        edit_button.forEach((edit)=>{

            edit.addEventListener("click",(e)=>{
                e.preventDefault();
                const edit_row=edit.closest("tr");
                const edit_id=edit_row!.id;
                // console.log(edit_id,"id");
                const submit=<HTMLButtonElement>document.querySelector(".submit");
                const update=<HTMLButtonElement>document.querySelector(".update");
                submit.classList.add("hide");
                update.classList.remove("hide")
                console.log(submit,update)
                setState(edit_id);
            })
        })
    }

}