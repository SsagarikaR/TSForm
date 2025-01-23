export default class BaseComponent {
    constructor() {
        if (this.constructor == BaseComponent) {
            throw new Error("Abstract classes can't be instantiated");
        }
    }
}
