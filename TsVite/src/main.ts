import App from "./components/App.js"

class index{

   container:HTMLDivElement

   constructor(rootId: string){
      const root=document.getElementById(rootId);
      this.container=document.createElement("div");
      this.container.setAttribute("class","container")
      root?.append(this.container)
      new App(this.container);
   }
}
new index("app");