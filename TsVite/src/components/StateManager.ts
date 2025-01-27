import { ForFormData, forState, forStateRecords } from "./Interface.js"

export default class StateManager{
    private static instance:StateManager

    private constructor(){

    }

    static getInstance():StateManager{
        if(!StateManager.instance){
            StateManager.instance=new StateManager();
        }
        return StateManager.instance;
    }

    setState(stateRecords:forStateRecords,state:forState,data:ForFormData|null=null,id:string|null=null){
        console.log(id);
        const NewData=data;
        if(NewData!==null){
            if(id===null){
                state.form={...NewData};
                state.table[Object.keys(state.table).length]={...NewData};
            }
            else{
                state.form={...NewData};
                state.table[id]={...NewData};
            }
        }
        else if (id !== null && id in state.table) {
            delete state.table[id];
            console.log(state.table)
        }
        // console.log(state);
        // console.log(Date());
        const newState = JSON.parse(JSON.stringify(state));
        const date = new Date();
        const formattedDateTime = date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        stateRecords[formattedDateTime]=newState;
        console.log(stateRecords);
        document.dispatchEvent(new CustomEvent("stateChanged"))
    }

    getState(stateRecords:forStateRecords,state:forState,key:string){
        console.log(stateRecords);
        console.log(stateRecords[key]);
         const newState=stateRecords[key];
         state.form={...newState.form};
         state.table={...newState.table};
        console.log(state);
        document.dispatchEvent(new CustomEvent("stateChanged"))
    }

}