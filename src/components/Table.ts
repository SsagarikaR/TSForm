import BaseCompoent from "./BaseComponent.js";

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
        
        this.render(this.tableElement);
    }
    render(table:HTMLElement): void {
        table.innerHTML=
                `
                <tr>
                   <th>Full name</th>
                   <th>Email</th>
                   <th>Contact</th>
                   <th>Action</th>
                </tr>
                `;
    }

}