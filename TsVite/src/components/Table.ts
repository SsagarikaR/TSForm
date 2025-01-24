import BaseCompoent from "./BaseComponent.js";
import {ForTableData} from "./Interface.js"

export default class Table extends BaseCompoent{
    private static instance:Table;
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

    static getInstance(root:HTMLElement | null):Table{
        if(!Table.instance){
            Table.instance=new Table(root);
        }
        return Table.instance;
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
            // console.log(tableData);
            const newRow=(<HTMLTableElement>this.tableElement).insertRow();
            newRow.setAttribute("id",key);
            newRow.insertCell().innerHTML=tableData[key as keyof typeof tableData].full_name;
            newRow.insertCell().innerHTML=tableData[key].email;
            newRow.insertCell().innerHTML=tableData[key].contact;
            const actionCell=newRow.insertCell()
            actionCell.classList.add("action");
            actionCell.innerHTML="<i class='fa fa-pencil-square-o edit' aria-hidden='true'></i> <i class='fa fa-trash delete' aria-hidden='true'></i>";
        })
        this.triggerEvents();
    }

    triggerEvents(){
        const edit_button=document.querySelectorAll(".edit");
        edit_button.forEach((edit)=>{

            edit.addEventListener("click",(e)=>{
                e.preventDefault();
                const edit_row=edit.closest("tr");
                const id=edit_row!.id;
                // console.log(id);
                document.dispatchEvent(new CustomEvent("editEvent",{detail:{id}}));
            })
        })

        const delete_button=document.querySelectorAll(".delete");
        delete_button.forEach((Delete)=>{

            Delete.addEventListener("click",(e)=>{
                e.preventDefault();
                const delete_row=Delete.closest("tr");
                const id=delete_row!.id;
                // console.log(id);
                document.dispatchEvent(new CustomEvent("deleteEvent",{detail:{id}}));
            })
        })
    }

}