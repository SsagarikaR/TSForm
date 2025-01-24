interface ForFormData{
    full_name:string,
    email:string,
    contact:string,
    password:string,
    college:string
}

interface ForTableData{[key:string]:ForFormData}

interface forState{
    form:ForFormData,
    table:ForTableData,
}

interface forValidation{
    [key:string]:{
        [key:string]:{
            logic:(val:string)=>boolean,
            message:string
        }
    }
}

export type { ForFormData, ForTableData, forState ,forValidation};