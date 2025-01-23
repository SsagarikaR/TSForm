export default abstract class BaseComponent{
    constructor(){
        if(this.constructor==BaseComponent){
            throw new Error ("Abstract classes can't be instantiated");
        }
    }

    abstract render(root:HTMLElement|null):void;
}