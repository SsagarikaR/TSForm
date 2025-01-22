export default class BaseComponent{
    constructor(){
        if(this.constructor==BaseComponent){
            throw new Error ("Abstract classes can't be instantiated");
        }
    }

    render(oot:HTMLElement|null){
        throw new Error("method 'render()' must be implemeted")
    }
}