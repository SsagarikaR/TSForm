import BaseComponent from "./BaseComponent";

export default class Notification extends BaseComponent{ 
    private static instance:Notification;
    notificationConatiner:HTMLDivElement;
    private constructor(root:HTMLElement|null){
        super();
        this.notificationConatiner=document.createElement("div");
        this.notificationConatiner.classList.add("notification-container")
        root?.appendChild(this.notificationConatiner);
    }

    static getInstance(root:HTMLElement|null):Notification{
        if(!Notification.instance){
            Notification.instance=new Notification(root);
        }
        return Notification.instance;
    }

    render(message:string): void {
        console.log(message);
        this.notificationConatiner.innerHTML=
                                        `
                                        <div id="toastBox">
                                            <div class="toast"> <i class="fa fa-check-circle" aria-hidden="true"></i> ${message}</div>
                                        </div>
                                        `
        setTimeout(()=>{
            document.querySelector(".toast")!.remove();
          //   body_container.removeClass("small_body-container")
        },5000)
    }
    

}