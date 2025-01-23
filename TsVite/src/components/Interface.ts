interface ForFormData{
    full_name:string,
    email:string,
    contact:string,
    password:string
}

interface ForTableData{[key:string]:ForFormData}

interface forState{
    form:ForFormData,
    table:ForTableData,
}

export type { ForFormData, ForTableData, forState };