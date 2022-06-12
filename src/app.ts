function dragElement(_d:any,elmnt:any) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (_d.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    _d.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
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

class DocsTitle{
  data:{
    text:string,
    fontSize:number
  };
  pos:{
    top:number,
    left:number
  }
}

class Docs{
  title:DocsTitle
}

class Canvas{

}
class CanvasController{
    _w:any=null;
    _d:any=null;
    holderEl:any=null;
    canvasEl:any=null;

    elInvoiceTitle:any=null;

    constructor(_w:any,_d:any){
        this._w=_w;
        this._d=_d;
    }

    setDocument(doc:Docs){
      this.setTitle(doc.title)
    }

    getDocument(){
      let title=this.getTitle();

      return {
        title
      }
    }

    setTitleFontSize(e:any){
      let type=(e.target.getAttribute("type"));
      let h1=this.elInvoiceTitle.getElementsByTagName("h1")[0];
      let fontSize=Number(h1?.style?.fontSize?.replace(/px/g,'')) || 20;
      if(type=="inc"){
        h1.style.fontSize= (fontSize+1)+'px'
      }else{
        h1.style.fontSize= (fontSize-1)+'px'
      }
    }


    setTitle(docTitle:DocsTitle){
      let div=this._d.createElement('div');
      div.innerHTML=`
      <div class="div-move">+</div>
      <div class="div-options-holder"></div>
      
      <h1 style="font-size:${docTitle?.data?.fontSize || 20}px" contenteditable="true">${docTitle?.data?.text || 'INVOICE TITLE'}</h1>`
      div.id='div-invoice-title';
      div.classList.add('div-dragable');
      div.style.top=(docTitle?.pos?.top ? docTitle?.pos?.top +'px' : 0);
      div.style.left=(docTitle?.pos?.left ? docTitle?.pos?.left +'px' : 0);
      this.elInvoiceTitle=div;
      this.canvasEl.append(div);
      let btnInc=document.createElement('button');
      btnInc.innerText='+'
      btnInc.setAttribute("type","inc")
      btnInc.onclick=this.setTitleFontSize.bind(this);
      div.getElementsByClassName("div-options-holder")[0].append(btnInc);
      let btnDec=document.createElement('button');
      btnDec.setAttribute("type","dec")
      btnDec.onclick=this.setTitleFontSize.bind(this);
      btnDec.style.marginLeft="5px"
      btnDec.innerText='-'
      div.getElementsByClassName("div-options-holder")[0].append(btnDec);
    }

    getTitle(){
      let h1=this.elInvoiceTitle.getElementsByTagName("h1")[0];
      let text=h1.innerText;
      let fontSize=Number(h1?.style?.fontSize?.replace(/px/g,'')) || 20;
      return {
        pos:{
          top:this.elInvoiceTitle.offsetTop,
          left:this.elInvoiceTitle.offsetLeft,
        },
        data:{
          text,
          fontSize
        }
      }

    }

    editLayout(selector:string,doc:Docs){
        this.holderEl=this._d.querySelectorAll(selector)[0];
        //this.holderEl!.style!.background ="#ccc"; 
        //this.holderEl!.style!.width ="100%"; 
        //this.holderEl!.style!.minHeight ="700px";
        //this.holderEl!.style!.position ="absolute";

        this.canvasEl=this._d.getElementById("invoice-canvas");
        
        this.setDocument(doc);
        this.drawControllers();
        this.drawCanvas();
    }

    save(){
      let doc=this.getDocument();
      return doc;
    }

    drawControllers(){

    }
    drawCanvas(){
        let holderWidth= this.holderEl.offsetWidth;
        let holderHeight= this.holderEl.offsetHeight;

        let canvasWidth=holderWidth-80;
        let canvasHeight=(canvasWidth/210)*297;

        this.canvasEl.style.width=canvasWidth+'px';
        this.canvasEl.style.height=canvasHeight+'px';
        let els=this._d.getElementsByClassName("div-dragable");
        for(let i=0;i<els.length;i++){
          dragElement(this._d,els[i]);
        }

    }

    
}


((_w:any,_d:any)=>{
    _w.Invoice=new CanvasController(_w,_d);
})(window,document);