class Canvas{

}
class CanvasController{
    _w:any=null;
    _d:any=null;
    holderEl:any=null;

    constructor(_w:any,_d:any){
        this._w=_w;
        this._d=_d;
    }

    editLayout(selector:string){
        this.holderEl=this._d.querySelectorAll(selector)[0];
        //this.holderEl!.style!.background ="#ccc"; 
        //this.holderEl!.style!.width ="100%"; 
        //this.holderEl!.style!.minHeight ="700px";
        //this.holderEl!.style!.position ="absolute";
        
        this.drawControllers();
        this.drawCanvas();
    }
    drawControllers(){
        console.log("drawControllers")
    }
    drawCanvas(){
        let holderWidth= this.holderEl.offsetWidth;
        let holderHeight= this.holderEl.offsetHeight;

        let canvasWidth=holderWidth-80;
        let canvasHeight=(canvasWidth/210)*297;

        let div=this._d.getElementById("invoice-canvas");
        div.style.width=canvasWidth+'px';
        div.style.height=canvasHeight+'px';
        this.dragElement(this._d.getElementById("mydiv"))

    }

    dragElement(elmnt:any) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (this._d.getElementById(elmnt.id + "header")) {
          /* if present, the header is where you move the DIV from:*/
          this._d.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
          /* otherwise, move the DIV from anywhere inside the DIV:*/
          elmnt.onmousedown = dragMouseDown;
        }
      
        function dragMouseDown(e:any) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }
      
        function elementDrag(e:any) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
      
        function closeDragElement() {
          /* stop moving when mouse button is released:*/
          document.onmouseup = null;
          document.onmousemove = null;
        }
    }
}


((_w:any,_d:any)=>{
    _w.Invoice=new CanvasController(_w,_d);
})(window,document);