import App from "./components/App.js"
class index{
   constructor(rootId: string){
    new App(rootId);
   }
}
new index("root");