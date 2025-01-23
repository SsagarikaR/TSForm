import BaseCompoent from "./BaseComponent.js";
export default class Table extends BaseCompoent {
    constructor(root) {
        super();
        this.allData = {};
        this.tableContainer = document.createElement("div");
        this.tableContainer.setAttribute("class", "table_container");
        this.tableElement = document.createElement("table");
        this.tableContainer.appendChild(this.tableElement);
        root === null || root === void 0 ? void 0 : root.appendChild(this.tableContainer);
        this.render(this.tableElement);
    }
    render(table) {
        table.innerHTML =
            `
                <tr>
                   <th>Full name</th>
                   <th>Email</th>
                   <th>Contact</th>
                   <th>Action</th>
                </tr>
                `;
        Object.keys(this.allData).forEach((key) => {
            // console.log(this.allData[key].full_name);
            const newRow = table.insertRow();
            newRow.setAttribute("id", key);
            newRow.insertCell().innerHTML = this.allData[key].full_name;
            newRow.insertCell().innerHTML = this.allData[key].email;
            newRow.insertCell().innerHTML = this.allData[key].contact;
            const actionCell = newRow.insertCell();
            actionCell.classList.add("action");
            actionCell.innerHTML = "<i class='fa fa-pencil-square-o edit' aria-hidden='true'></i> <i class='fa fa-trash delete' aria-hidden='true'></i>";
        });
        this.edit();
    }
    setter(FormsData) {
        // console.log(FormsData);
        this.allData[Object.keys(this.allData).length] = FormsData;
        console.log(this.allData);
        this.render(this.tableElement);
    }
    edit() {
        const edit_button = document.querySelectorAll(".edit");
        console.log(edit_button);
        edit_button.forEach((edit) => {
            edit.addEventListener("click", (e) => {
                e.preventDefault();
                const edit_row = edit.closest("tr");
                const edit_id = edit_row.id;
                console.log(edit_id, "id");
                document.getElementById("full_name").value = this.allData[edit_id].full_name;
                document.getElementById("full_name").value = this.allData[edit_id].email;
                document.getElementById("full_name").value = this.allData[edit_id].contact;
                document.getElementById("full_name").value = this.allData[edit_id].password;
            });
        });
    }
}
