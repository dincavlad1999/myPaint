/*Referinte butoane pentru feature - uri *******************************************************************************************************/
const referintaLineWidth = document.getElementById("line_width");
const referintaLineColor = document.getElementById("line_color");
const referintaBackgroundColor = document.getElementById("background_color");
let lineColor = referintaLineColor.value; // black default
let backgroundColor = referintaBackgroundColor.value; // white default
let lineWidth = referintaLineWidth.options[referintaLineWidth.selectedIndex].value; //1px default

console.log(lineColor + " " + backgroundColor + " " + lineWidth);



/*Functionalitati butoane feature - uri 

referintaLineWidth.addEventListener("change",e => {
                lineWidth =  referintaLineWidth.options[referintaLineWidth.selectedIndex].value;
                console.log(lineColor + " " + backgroundColor + " " + lineWidth);
});

referintaLineColor.addEventListener("change", e => {
                lineColor = referintaLineColor.value;
                console.log(lineColor + " " + backgroundColor + " " + lineWidth);
});

referintaBackgroundColor.addEventListener("change", e => {
                backgroundColor = referintaBackgroundColor.value;
                console.log(lineColor + " " + backgroundColor + " " + lineWidth);
});
*/

/* Referinta canvas peste care desenez *********************************************************************************************************/

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

/* Functie care deseneaza figurile ******************************************************************************************************************************* */
function deseneazaFiguri()
{   ctx.fillStyle = backgroundColor;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    deseneazaCreioane();
    deseneazaLinii();
    deseneazaDreptunghiuri();
    deseneazaElipse();
}

/* Functionalitati butoane shape - uri ***********************************************************************************************************/
/* Pentru creion ***************************************************************************************************************************************/
const referintaButonCreion = document.getElementById("pencil");
class Creion{
    constructor(x0,y0,x1,y1,width,color)
    {
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.width = width;
        this.color = color;
    }
}

let vectorCreioane = [];

referintaButonCreion.addEventListener("click", e=> {
        referintaButonCreion.disabled = true;
        if(referintaButonLinie.disabled === true)
        {
        referintaButonLinie.disabled = false;
        canvas.removeEventListener("mousedown",down);
        canvas.removeEventListener("mouseup",up); // daca este cazul scap de event listener-urile create anterior 
        canvas.removeEventListener("mousemove",move);
        }
        if(referintaButonDreptunghi.disabled ===true)
        {
            referintaButonDreptunghi.disabled = false;
            canvas.removeEventListener("mousedown",down);
            canvas.removeEventListener("mouseup",up); // daca este cazul scap de event listener-urile create anterior 
            canvas.removeEventListener("mousemove",move);
        }
        if(referintaButonElipsa.disabled === true)
        {
            referintaButonElipsa.disabled = false;
            canvas.removeEventListener("mousedown",down);
            canvas.removeEventListener("mouseup",up); // daca este cazul scap de event listener-urile create anterior 
            canvas.removeEventListener("mousemove",move);
    
        }
        deseneazaCreion(lineWidth,lineColor);

});

function deseneazaCreion(lineWidth,lineColor)
{
let lineW = lineWidth;
let lineC = lineColor;
let isDrawing = false;
let x = 0;
let y = 0;

down = function(e)
{
    x = e.offsetX;
    y = e.offsetY;
    isDrawing = true;
}

canvas.addEventListener("mousedown",down);

move = function(e)
{
    if (isDrawing === true) {
        drawPencil(ctx, x, y, e.offsetX, e.offsetY,lineW,lineC);
        x = e.offsetX;
        y = e.offsetY;
      }
}

canvas.addEventListener("mousemove",move);

up = function(e)
{
    if (isDrawing === true) {
       //drawPencil(ctx, x, y, e.offsetX, e.offsetY,lineWidth,lineColor);
        //x = 0;
        //y = 0;
        isDrawing = false;
      }
}

canvas.addEventListener("mouseup",up);

function drawPencil(context, x1, y1, x2, y2,lineWidth,lineColor) 
{ //context.clearRect(0,0,canvas.width,canvas.height);
  deseneazaFiguri();
  context.beginPath();
  context.strokeStyle = lineColor;
  context.lineWidth = lineWidth;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
 let creion = new Creion(x1,y1,x2,y2,lineWidth,lineColor);
 vectorCreioane.push(creion);
}

/*Evenimente in timpul desenarii liniei */

referintaLineWidth.addEventListener("change",e => {
    lineW =  referintaLineWidth.options[referintaLineWidth.selectedIndex].value;
    console.log(lineColor + " " + backgroundColor + " " + lineWidth);
});

referintaLineColor.addEventListener("change", e => {
    lineC = referintaLineColor.value;
    console.log(lineColor + " " + backgroundColor + " " + lineWidth);
});


}

function deseneazaCreioane()
{
    if(vectorCreioane)
    {
        for(let i = 0 ; i < vectorCreioane.length; i++)
        {  console.log("VlAD !");
            ctx.beginPath();
            ctx.strokeStyle = vectorCreioane[i].color;
            ctx.lineWidth = vectorCreioane[i].width;
            ctx.moveTo(vectorCreioane[i].x0, vectorCreioane[i].y0);
            ctx.lineTo(vectorCreioane[i].x1, vectorCreioane[i].y1);
            ctx.stroke();
        }
    }
}


/* Pentru Linie ********************************************************************************************************************************/
const referintaButonLinie = document.getElementById("line");

// Fac un obiect in care o sa retin fiecare desen si o sa-l redesenez de fiecare data cand desenez celelalte desenate 
class Linie{
    constructor(x0,y0,x1,y1,width,color)
    {
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.width = width;
        this.color = color;
    }

}

let vectorLinii = [];


referintaButonLinie.addEventListener("click", e => {
    referintaButonLinie.disabled = true;
    if(referintaButonDreptunghi.disabled ===true)
    {
        referintaButonDreptunghi.disabled = false;
        canvas.removeEventListener("mousedown",down);
        canvas.removeEventListener("mouseup",up); // daca este cazul scap de event listener-urile create anterior 
        canvas.removeEventListener("mousemove",move);
    }
    if(referintaButonElipsa.disabled === true)
    {
        referintaButonElipsa.disabled = false;
        canvas.removeEventListener("mousedown",down);
        canvas.removeEventListener("mouseup",up); // daca este cazul scap de event listener-urile create anterior 
        canvas.removeEventListener("mousemove",move);

    }
    if(referintaButonCreion.disabled === true)
        {
        referintaButonCreion.disabled = false;
        canvas.removeEventListener("mousedown",down);
        canvas.removeEventListener("mouseup",up); // daca este cazul scap de event listener-urile create anterior 
        canvas.removeEventListener("mousemove",move);
        }
    deseneazaLinie(lineWidth,lineColor);
});

function deseneazaLinii()
{   
    if(vectorLinii)
    {
        for(let i = 0 ; i < vectorLinii.length ; i ++)
        {   console.log("AM ajuns AICI!");
            ctx.strokeStyle = vectorLinii[i].color;
            ctx.lineWidth = vectorLinii[i].width;
            ctx.beginPath();
            ctx.moveTo(vectorLinii[i].x0,vectorLinii[i].y0);
            ctx.lineTo(vectorLinii[i].x1,vectorLinii[i].y1);
            ctx.stroke();
        }
    }
}
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
let move,up,down; // o sa contina functii care o sa ma ajute la stergerea evenimentelor 
/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/
function deseneazaLinie(lineWidth,lineColor)
{   let lineW = lineWidth;
    let lineC = lineColor;
    let backgroundC = null;
    
    
    let isDrawing = false;
    let x0,y0;
    
     down = function(e)
    {
        x0 = e.offsetX;
        y0 = e.offsetY;
        isDrawing = true;
        
    }
    canvas.addEventListener("mousedown",down);
    
    move = function(e)
    {
        if(isDrawing === true)
        {
        drawLine(ctx,x0,y0,e.offsetX,e.offsetY,lineW,lineC);
        }
    }
    canvas.addEventListener("mousemove",move);
    
    up = function(e){
        isDrawing = false;
        let valoare = new Linie(x0,y0,e.offsetX,e.offsetY,lineW,lineC);
        vectorLinii.push(valoare);
    }
    canvas.addEventListener("mouseup",up);
    
    function drawLine(context,x0,y0,x1,y1,lineWidth,lineColor)
    {   context.clearRect(0,0,canvas.width,canvas.height); // curat dreptunghiul canvasului 
        deseneazaFiguri(); // AICI REDESENEZ desenele anterioare 
        context.strokeStyle = lineColor; // colorez linia
        context.lineWidth = lineWidth; // aleg grosimea liniei
        context.beginPath();
        context.moveTo(x0,y0);
        context.lineTo(x1,y1);
        context.stroke();
        
    }

    /*Evenimente in timpul desenarii liniei */

    referintaLineWidth.addEventListener("change",e => {
        lineW =  referintaLineWidth.options[referintaLineWidth.selectedIndex].value;
        console.log(lineColor + " " + backgroundColor + " " + lineWidth);
});

referintaLineColor.addEventListener("change", e => {
        lineC = referintaLineColor.value;
        console.log(lineColor + " " + backgroundColor + " " + lineWidth);
});


}

/* Pentru Dreptunghi ********************************************************************************************************************************/
const referintaButonDreptunghi = document.getElementById("rectangle");

referintaButonDreptunghi.addEventListener("click", e => {
    referintaButonDreptunghi.disabled = true;
    if(referintaButonLinie.disabled === true)
    {
        referintaButonLinie.disabled = false;
        canvas.removeEventListener("mousedown",down);
        canvas.removeEventListener("mouseup",up); // daca este cazul scap de event listener-urile create anterior 
        canvas.removeEventListener("mousemove",move);
    }
    if(referintaButonElipsa.disabled === true)
    {
        referintaButonElipsa.disabled = false;
        canvas.removeEventListener("mousedown",down);
        canvas.removeEventListener("mouseup",up); // daca este cazul scap de event listener-urile create anterior 
        canvas.removeEventListener("mousemove",move);
    }
    if(referintaButonCreion.disabled === true)
        {
        referintaButonCreion.disabled = false;
        canvas.removeEventListener("mousedown",down);
        canvas.removeEventListener("mouseup",up); // daca este cazul scap de event listener-urile create anterior 
        canvas.removeEventListener("mousemove",move);
        }
    deseneazaDreptunghi(lineWidth,lineColor);
});

//PROBLEMA!!!  RAMANE EVENT LISTENERUL activat de la linie (s-a rezolvat cu .removeEventListener)
class Dreptunghi{
    constructor(x0,y0,x1,y1,width,color)
    {
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.width = width;
        this.color = color;
    }

}

let vectorDreptunghiuri =[];
//let move,up,down; // o sa contina functii care o sa ma ajute la stergerea evenimentelor 
function deseneazaDreptunghiuri()
{   deseneazaLinii();
    if(vectorDreptunghiuri)
    {
        for(let i = 0 ; i < vectorDreptunghiuri.length ; i ++)
        { 
        ctx.strokeStyle = vectorDreptunghiuri[i].color; // colorez linia
        ctx.lineWidth = vectorDreptunghiuri[i].width; // aleg grosimea liniei
        ctx.beginPath()
        ctx.moveTo(vectorDreptunghiuri[i].x0,vectorDreptunghiuri[i].y0);
        ctx.lineTo(vectorDreptunghiuri[i].x1,vectorDreptunghiuri[i].y0);
        ctx.lineTo(vectorDreptunghiuri[i].x1,vectorDreptunghiuri[i].y1);
        ctx.lineTo(vectorDreptunghiuri[i].x0,vectorDreptunghiuri[i].y1);
        ctx.closePath();
        ctx.stroke();
        }
    }
   
}

function deseneazaDreptunghi(lineWidth,lineColor)
{   let lineW = lineWidth;
    let lineC = lineColor;
    let backgroundC = null;

let isDrawing = false;
let x0,y0;

down = function(e)
{
    x0 = e.offsetX;
    y0 = e.offsetY;
    isDrawing = true; 
}

canvas.addEventListener("mousedown",down);

move = function(e)
{
    if(isDrawing === true)
    {
    drawRectangle(ctx,x0,y0,e.offsetX,e.offsetY,lineW,lineC);
    }
}

canvas.addEventListener("mousemove",move);

up = function(e)
{
    isDrawing = false;
    let dreptunghi = new Dreptunghi(x0,y0,e.offsetX,e.offsetY,lineW,lineC);
    vectorDreptunghiuri.push(dreptunghi);
}

canvas.addEventListener("mouseup",up);


function drawRectangle(context,x0,y0,x1,y1,lineWidth,lineColor)
{   context.clearRect(0,0,canvas.width,canvas.height); // curat dreptunghiul canvasului pentru fiecare frame 
    deseneazaFiguri();
    context.strokeStyle = lineColor; // colorez linia
    context.lineWidth = lineWidth; // aleg grosimea liniei
    context.beginPath()
    context.moveTo(x0,y0);
    context.lineTo(x1,y0);
    context.lineTo(x1,y1);
    context.lineTo(x0,y1);
    context.closePath();
    context.stroke();
}

  /*Evenimente in timpul desenarii dreptunghiului */

  referintaLineWidth.addEventListener("change",e => {
    lineW =  referintaLineWidth.options[referintaLineWidth.selectedIndex].value;
    console.log(lineColor + " " + backgroundColor + " " + lineWidth);
});

referintaLineColor.addEventListener("change", e => {
    lineC = referintaLineColor.value;
    console.log(lineColor + " " + backgroundColor + " " + lineWidth);
});


}


/* Pentru Elipsa ********************************************************************************************************************************/
const referintaButonElipsa = document.getElementById("ellipse");

referintaButonElipsa.addEventListener("click", e => {
    referintaButonElipsa.disabled = true;
    if(referintaButonLinie.disabled === true)
    {
        referintaButonLinie.disabled = false;
        canvas.removeEventListener("mouseup",up);
        canvas.removeEventListener("mousemove",move);
        canvas.removeEventListener("mousedown",down);
    }
    if(referintaButonDreptunghi.disabled === true)
    {
        referintaButonDreptunghi.disabled = false;
        canvas.removeEventListener("mouseup",up);
        canvas.removeEventListener("mousemove",move);
        canvas.removeEventListener("mousedown",down);
    }
    if(referintaButonCreion.disabled === true)
        {
        referintaButonCreion.disabled = false;
        canvas.removeEventListener("mousedown",down);
        canvas.removeEventListener("mouseup",up); // daca este cazul scap de event listener-urile create anterior 
        canvas.removeEventListener("mousemove",move);
        }
    deseneazaElipsa(lineWidth,lineColor);
});

class Elipsa {
    constructor(x1, y1, x2, y2,lineWidth,lineColor)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.width = lineWidth;
        this.color = lineColor;
    }

}

let vectorElipse= [];

function deseneazaElipse()
{   if(vectorElipse)
    {
    for(let i = 0 ; i < vectorElipse.length ; i ++)
    {
        let radiusX = (vectorElipse[i].x2  - vectorElipse[i].x1 ) * 0.5,   /// radius for x based on input
        radiusY = (vectorElipse[i].y2 - vectorElipse[i].y1) * 0.5,   /// radius for y based on input
        centerX = vectorElipse[i].x1  + radiusX,      /// calc center
        centerY = vectorElipse[i].y1 + radiusY,
        step = 0.01,                 /// resolution of ellipse
        a = step,                    /// counter
        pi2 = Math.PI * 2 - step;    /// end angle
    

    // colorez elipsa
        ctx.strokeStyle = vectorElipse[i].color; 
        ctx.lineWidth =vectorElipse[i].width; 
    /// start a new path
    ctx.beginPath();

    /// set start point at angle 0
    ctx.moveTo(centerX + radiusX * Math.cos(0),
               centerY + radiusY * Math.sin(0));

    /// create the ellipse    
    for(; a < pi2; a += step) {
        ctx.lineTo(centerX + radiusX * Math.cos(a),
                   centerY + radiusY * Math.sin(a));
    }
    
    /// close it and stroke it for demo
    ctx.closePath();
    ctx.stroke();
    }
}
}

/// handle mouse down    
function deseneazaElipsa(lineWidth,lineColor)
{
    let lineW = lineWidth;
    let lineC = lineColor;
    let backgroundC = null;

    let w = canvas.width,
    h = canvas.height,
    x1,                 /// start points
    y1,
    x2,         // end points
    y2, 
    isDown = false;     /// if mouse button is down

down = function(e)
{
/// get corrected mouse position and store as first point
let rect = canvas.getBoundingClientRect();
x1 = e.clientX - rect.left;
y1 = e.clientY - rect.top;
isDown = true;
}
    
canvas.addEventListener("mousedown",down);


up = function(e)
{/// clear isDown flag to stop drawing
    isDown = false;
    let elipsa =  new Elipsa(x1,y1,x2,y2,lineW,lineC);
    vectorElipse.push(elipsa);
}
canvas.addEventListener("mouseup",up);

move = function(e)
{
if (!isDown) return;
    
    let rect = canvas.getBoundingClientRect();
        x2 = e.clientX - rect.left;
        y2 = e.clientY - rect.top;
    
    /// clear canvas
   // ctx.clearRect(0, 0, w, h);

    /// draw ellipse
    drawEllipse(ctx,x1, y1, x2, y2,lineW,lineC);
}

/// draw ellipse from start point
canvas.addEventListener("mousemove",move);

function drawEllipse(context,x1, y1, x2, y2,lineWidth,lineColor) {
    context.clearRect(0,0,w,h); // curat canvas 
    deseneazaFiguri(); // DESENEZ FIGURILE  !!!!!!!!!!!!!!!!!!!!!!!
    var radiusX = (x2 - x1) * 0.5,   /// radius for x based on input
        radiusY = (y2 - y1) * 0.5,   /// radius for y based on input
        centerX = x1 + radiusX,      /// calc center
        centerY = y1 + radiusY,
        step = 0.01,                 /// resolution of ellipse
        a = step,                    /// counter
        pi2 = Math.PI * 2 - step;    /// end angle
    

    // colorez elipsa
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
    /// start a new path
    ctx.beginPath();

    /// set start point at angle 0
    ctx.moveTo(centerX + radiusX * Math.cos(0),
               centerY + radiusY * Math.sin(0));

    /// create the ellipse    
    for(; a < pi2; a += step) {
        ctx.lineTo(centerX + radiusX * Math.cos(a),
                   centerY + radiusY * Math.sin(a));
    }
    
    /// close it and stroke it for demo
    ctx.closePath();
    ctx.stroke();
}

/*Evenimente in timpul desenarii elipsei */

referintaLineWidth.addEventListener("change",e => {
    lineW =  referintaLineWidth.options[referintaLineWidth.selectedIndex].value;
    console.log(lineColor + " " + backgroundColor + " " + lineWidth);
});

referintaLineColor.addEventListener("change", e => {
    lineC = referintaLineColor.value;
    console.log(lineColor + " " + backgroundColor + " " + lineWidth);
});

}

/* EXPORT RASTER ****************************************************************************************************************************/

const referintaButonRaster = document.getElementById("Raster");

referintaButonRaster.addEventListener("click", e => {
    let anchor = document.createElement("a");
    anchor.download = prompt("Introdu nume fisier:");
    anchor.href = canvas.toDataURL(); // png este default
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
});

/* EXPORT SVG ****************************************************************************************************************************/

// NU FUNCTIONEAZA CUM TREBUIE !
/*const referintaButonSVG = document.getElementById("SVG");

referintaButonSVG.addEventListener("click", e => {
    let anchor = document.createElement("a");
    anchor.download = prompt("Introdu nume fisier:");
    anchor.href = canvas.toDataURL("image/svg+xml"); // specific media type-ul (MIME)
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

})*/

/*afișare lista de figuri existentă în desen și posibilitatea de a șterge o figură oarecare ***************************************************/

const referintaButonDateFiguri = document.getElementById("date-figuri");
const referintaContainerFiguri = document.getElementsByClassName("figuri")[0]; // daca nu pun asa iau eroare pt ca intoarce mereu un array-like collection of elements

referintaButonDateFiguri.addEventListener("click",dateFiguri);

function dateFiguri()
{referintaButonDateFiguri.disabled = true;
let paragraf = document.createElement("p");
paragraf.textContent = "Figurile create sunt(apasă oriunde pe descrierea figurii pentru opțiuni suplimentare):";
referintaContainerFiguri.appendChild(paragraf);
let paragraf2 = document.createElement("p");
paragraf2.textContent = "Linii: " + vectorLinii.length;
referintaContainerFiguri.appendChild(paragraf2);
if(vectorLinii.length)
{
    let listaLinii = document.createElement("ol");
    listaLinii.className = "lista-linii";
    referintaContainerFiguri.appendChild(listaLinii);
    for(let i = 0 ; i < vectorLinii.length; i ++)
    {
        let linie = document.createElement("li");
        linie.id = "" + (i+1); // folosesc ca sa identific figura la care se refera user-ul
        let textNode = document.createTextNode(` [line width -- ${vectorLinii[i].width}px] - [line color -- ${vectorLinii[i].color}] - [coordonate -- (${vectorLinii[i].x0},${vectorLinii[i].y0}),(${vectorLinii[i].x1},${vectorLinii[i].y1})]`);
        linie.appendChild(textNode);
        listaLinii.appendChild(linie);
    }
}
let paragraf3 = document.createElement("p");
paragraf3.textContent = "Dreptunghiuri: " + vectorDreptunghiuri.length;
referintaContainerFiguri.appendChild(paragraf3);
if(vectorDreptunghiuri.length)
{
    let listaDreptunghiuri = document.createElement("ol");
    listaDreptunghiuri.className ="lista-dreptunghiuri";
    referintaContainerFiguri.appendChild(listaDreptunghiuri);
    for(let i = 0 ; i < vectorDreptunghiuri.length ; i++)
    {
        let dreptunghi = document.createElement("li");
        dreptunghi.id = "" + (i+1); // folosesc ca sa identific figura la care se refera user-ul
        let textNode = document.createTextNode(` [line color -- ${vectorDreptunghiuri[i].color}] - [line width -- ${vectorDreptunghiuri[i].width}px]`)
        dreptunghi.appendChild(textNode);
        listaDreptunghiuri.appendChild(dreptunghi);
    }
}
let paragraf4 = document.createElement("p");
paragraf4.textContent = "Elipse:" + vectorElipse.length;
referintaContainerFiguri.appendChild(paragraf4);
if(vectorElipse.length)
{
    let listaElipse = document.createElement("ol");
    listaElipse.className = "lista-elipse";
    referintaContainerFiguri.appendChild(listaElipse);
    for(let i = 0 ; i < vectorElipse.length ; i++)
    {
        let elipsa = document.createElement("li");
        elipsa.id = "" + (i+1); // folosesc ca sa identific figura la care se refera user-ul
        let textNode = document.createTextNode(` [line color -- ${vectorElipse[i].color}] - [line width -- ${vectorElipse[i].width}px]`);
        elipsa.appendChild(textNode);
        listaElipse.appendChild(elipsa);
    }
}
/* Sterge o figura la alegere din descrierea figurilor*/

/* PENTRU LINII *************************************************************************************************************************************/
const olLinii = document.querySelector(".lista-linii");
const stergLinie = document.querySelectorAll(".lista-linii li");

for(let i = 0 ; i < stergLinie.length ;i++)
{
    stergLinie[i].addEventListener("click", e => {
       
      // let index = stergLinie[i].id - 1;
      let alegere = prompt("Alege numarul corespunzator optiunii dorite:\n 1 --> Sterge o figura din categoria selectata;\n 2 --> Schimba caracteristicile unei figuri din categoria selectata.");
      console.log(alegere);
      if(alegere === "1")
      {
      let index = prompt("Ce linie doresti sa stergi ?\n(selecteaza numarul liniei dorite)");
      vectorLinii.splice(index - 1,1);
      ctx.clearRect(0,0,canvas.width,canvas.height); // golesc canvas-ul pentru al desena din nou ulterior 
      deseneazaFiguri();
      olLinii.removeChild(stergLinie[index-1]);
      }
      else if(alegere === "2")
      {
        let alegere = prompt("Alege numarul corespunzator optiunii dorite:\n 1 --> Modifica culoarea;\n 2 --> Modifica grosimea liniei figurii.")
        if(alegere === "1")
        {
        let culoare = null;
        let alegere = prompt("Alege numarul corespunzator culorii dorite:\n 1 --> rosu\n 2 --> albastru\n 3 --> galben");
        if(alegere === "1")
        {
            culoare = "FF0000"; //red
        }
        else if(alegere === "2")
        {
            culoare = "0000FF"; //blue
        }
        else {
            culoare = "FFFF00"; // yellow
        }
        let index = prompt("Carei linii doresti sa-i schimbi culoarea ?\n(selecteaza numarul liniei dorite)"); 
        vectorLinii[index-1].color = "#"+culoare;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        deseneazaFiguri();
        for(let i = 0 ; i < stergLinie.length; i++) // updatez lista
            {
               if(stergLinie[i].id ===  index)
               {
                   stergLinie[i].textContent = ` [line width -- ${vectorLinii[index-1].width}px] - [line color -- ${vectorLinii[index-1].color}] - [coordonate -- (${vectorLinii[index-1].x0},${vectorLinii[index-1].y0}),(${vectorLinii[index-1].x1},${vectorLinii[index-1].y1})]`;
               }
            }
        }
        else if(alegere === "2")
        {
            let alegere = prompt("Introdu un numar pentru grosimea liniei(px):");
            let index = prompt("Carei linii doresti sa-i schimbi grosimea ?\n(selecteaza numarul liniei dorite)"); 
            vectorLinii[index-1].width = alegere;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            deseneazaFiguri();
            for(let i = 0 ; i < stergLinie.length; i++) // updatez lista 
            {
               if(stergLinie[i].id ===  index)
               {
                   stergLinie[i].textContent = ` [line width -- ${vectorLinii[index-1].width}px] - [line color -- ${vectorLinii[index-1].color}] - [coordonate -- (${vectorLinii[index-1].x0},${vectorLinii[index-1].y0}),(${vectorLinii[index-1].x1},${vectorLinii[index-1].y1})]`;
               }
            }
        }
      }
      
    });
}



/* PENTRU DREPTUNGHI *************************************************************************************************************************************/
const olDreptunghiuri = document.querySelector(".lista-dreptunghiuri");
const stergDreptunghi = document.querySelectorAll(".lista-dreptunghiuri li");

for(let i = 0 ; i < stergDreptunghi.length ;i++)
{
    stergDreptunghi[i].addEventListener("click", e => {
       
      // let index = stergLinie[i].id - 1;
      let alegere = prompt("Alege numarul corespunzator optiunii dorite:\n 1 --> Sterge o figura din categoria selectata;\n 2 --> Schimba caracteristicile unei figuri din categoria selectata.");
      console.log(alegere);
      if(alegere === "1")
      {
      let index = prompt("Ce dreptunghi doresti sa stergi ?\n(selecteaza numarul dreptunghiului dorit)");
      vectorDreptunghiuri.splice(index - 1,1);
      ctx.clearRect(0,0,canvas.width,canvas.height); // golesc canvas-ul pentru al desena din nou ulterior 
      deseneazaFiguri();
      olDreptunghiuri.removeChild(stergDreptunghi[index-1]);
      }
      else if(alegere === "2")
      {
        let alegere = prompt("Alege numarul corespunzator optiunii dorite:\n 1 --> Modifica culoarea;\n 2 --> Modifica grosimea liniei figurii.")
        if(alegere === "1")
        {
        let culoare = null;
        let alegere = prompt("Alege numarul corespunzator culorii dorite:\n 1 --> rosu\n 2 --> albastru\n 3 --> galben");
        if(alegere === "1")
        {
            culoare = "FF0000"; //red
        }
        else if(alegere === "2")
        {
            culoare = "0000FF"; //blue
        }
        else {
            culoare = "FFFF00"; // yellow
        }
        let index = prompt("Carui dreptunghi doresti sa-i schimbi culoarea ?\n(selecteaza numarul dreptunghiului dorit)"); 
        vectorDreptunghiuri[index-1].color = "#"+culoare;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        deseneazaFiguri();
        for(let i = 0 ; i < stergDreptunghi.length; i++) // updatez lista
            {
               if(stergDreptunghi[i].id === index)
               {
                   stergDreptunghi[i].textContent = `[line color -- ${vectorDreptunghiuri[index-1].color} ] - [line width -- ${vectorDreptunghiuri[index-1].width}}px]`;
               }
            }
        }
        else if(alegere === "2")
        {
            let alegere = prompt("Introdu un numar pentru grosimea liniei(px):");
            let index = prompt("Carui dreptunghi doresti sa-i schimbi grosimea ?\n(selecteaza numarul dreptunghiului dorit)"); 
            vectorDreptunghiuri[index-1].width = alegere;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            deseneazaFiguri();
            for(let i = 0 ; i < stergDreptunghi.length; i++) // updatez lista
            {
               if(stergDreptunghi[i].id ===  index)
               { 
                   stergDreptunghi[i].textContent = ` [line color -- ${vectorDreptunghiuri[index-1].color}] - [line width -- ${vectorDreptunghiuri[index-1].width}px]`;
               }
            }
        }
      }
      
    });
}

/* PENTRU ELIPSA *************************************************************************************************************************************/
const olElipse = document.querySelector(".lista-elipse");
const stergElipsa = document.querySelectorAll(".lista-elipse li");

for(let i = 0 ; i < stergElipsa.length ;i++)
{
    stergElipsa[i].addEventListener("click", e => {
       
      // let index = stergLinie[i].id - 1;
      let alegere = prompt("Alege numarul corespunzator optiunii dorite:\n 1 --> Sterge o figura din categoria selectata;\n 2 --> Schimba caracteristicile unei figuri din categoria selectata.");
      console.log(alegere);
      if(alegere === "1")
      {
      let index = prompt("Ce elipsa doresti sa stergi ?\n(selecteaza numarul elipsei dorite)");
      vectorElipse.splice(index - 1,1);
      ctx.clearRect(0,0,canvas.width,canvas.height); // golesc canvas-ul pentru al desena din nou ulterior 
      deseneazaFiguri();
      olElipse.removeChild(stergElipsa[index-1]);
      }
      else if(alegere === "2")
      {
        let alegere = prompt("Alege numarul corespunzator optiunii dorite:\n 1 --> Modifica culoarea;\n 2 --> Modifica grosimea liniei figurii.")
        if(alegere === "1")
        {
        let culoare = null;
        let alegere = prompt("Alege numarul corespunzator culorii dorite:\n 1 --> rosu\n 2 --> albastru\n 3 --> galben");
        if(alegere === "1")
        {
            culoare = "FF0000"; //red
        }
        else if(alegere === "2")
        {
            culoare = "0000FF"; //blue
        }
        else {
            culoare = "FFFF00"; // yellow
        }
        let index = prompt("Carei elipse doresti sa-i schimbi culoarea ?\n(selecteaza numarul elipsei dorite)"); 
        vectorElipse[index-1].color = "#"+culoare;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        deseneazaFiguri();
        for(let i = 0 ; i < stergElipsa.length; i++) // updatez lista
            {
               if(stergElipsa[i].id === index)
               {
                   stergElipsa[i].textContent = `[line color -- ${vectorElipse[index-1].color} ] - [line width -- ${vectorElipse[index-1].width}}px]`;
               }
            }
        }
        else if(alegere === "2")
        {
            let alegere = prompt("Introdu un numar pentru grosimea liniei(px):");
            let index = prompt("Carei elipse doresti sa-i schimbi grosimea ?\n(selecteaza numarul elipsei dorite)"); 
            vectorElipse[index-1].width = alegere;
            ctx.clearRect(0,0,canvas.width,canvas.height);
            deseneazaFiguri();
            for(let i = 0 ; i < stergElipsa.length; i++) // updatez lista
            {
               if(stergElipsa[i].id ===  index)
               { 
                   stergElipsa[i].textContent = ` [line color -- ${vecotrElipse[index-1].color}] - [line width -- ${vectorElipse[index-1].width}px]`;
               }
            }
        }
      }
      
    });
}
}


/* BACKGROUND COLOR **************************************************************************************************************************/

referintaBackgroundColor.onchange = e => {
                backgroundColor = referintaBackgroundColor.value;
                deseneazaFiguri();
};



