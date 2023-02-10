"use strict";
var canvas = document.getElementById('canvasID');
var ctx = canvas.getContext('2d');

var colorpicker = document.getElementById('colorpickerID');
var widthpicker = document.getElementById('widthpickerID');
var cappicker = document.getElementById('cappickerID');
var opacpicker = document.getElementById('opacitypickerID');
var eraserpicker = document.getElementById('eraserpickerID');

var coord = {x:0, y:0};
var overCanvas = false;
var paint = false;

document.addEventListener('mousedown', startPainting);
document.addEventListener('mouseup', stopPainting);
document.addEventListener('mousemove', sketch);
document.getElementById('imagepickerID').addEventListener('change', applyImage);

canvas.addEventListener('mouseover', () => {
    overCanvas = true;
})

canvas.addEventListener('mouseout', () => {
    overCanvas = false;
})

eraserpicker.addEventListener('change', () => {
    if (eraserpicker.checked) {
        canvas.style.cursor = "url('Images/eraser.png'), auto";

    } else {
        canvas.style.cursor = "crosshair";

    }
})

function applyImage() {
    if (!this.files || !this.files[0]) return;
 
    const reader = new FileReader();

    reader.addEventListener("load", (evt) => {
      const img = new Image();

      img.addEventListener("load", () => {
        ctx.drawImage(img, 0, 0);
      });

      img.src = evt.target.result;
    });

    reader.readAsDataURL(this.files[0]);
}

function setupCanvas() {
    canvas.style.top = topnav.offsetHeight + "px";
    canvas.style.left = "0px"

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - topnav.offsetHeight;
}

function getPosition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}
 
function startPainting(event) {
    paint = true;

    getPosition(event);
    sketch(event);
}
 
function stopPainting() {
    paint = false;
}

function getPencilColor() {
    return colorpicker.value;
}
 
function getPencilWidth() {
    return widthpicker.value;
}

function getLineCap() {
    return cappicker.value;
}

function getPencilOpacity() {
    return opacpicker.value / 10;
}

function isEraser() {
    return eraserpicker.checked;
}
     
function sketch(event) {
    if (!paint || sidenavVisible || upnavVisible || !overCanvas) return;

    if (isEraser()) {
        getPosition(event);

        let size = getPencilWidth();

        ctx.clearRect(coord.x, coord.y, size, size);

    } else {
        ctx.beginPath();
    
        ctx.lineWidth = getPencilWidth();
        ctx.lineCap = getLineCap();
        ctx.strokeStyle = getPencilColor();
        ctx.globalAlpha = getPencilOpacity();
    
        ctx.moveTo(coord.x, coord.y);

        getPosition(event);
        
        ctx.lineTo(coord.x , coord.y);
        ctx.stroke();
    }
}

function clearCanvas() {
    if(sidenavVisible || upnavVisible) return;

    let isConfirm = confirm("Do you want to clear the canvas?");

    if(isConfirm) ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function downloadCanvas() {
    if(sidenavVisible || upnavVisible) return;

    let dataURL = canvas.toDataURL();
    let anchor = document.createElement('a');
 
    anchor.href = dataURL;
    anchor.download = "canvas-to-image";
    anchor.click();
}

function cancelUpnav() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    toggleUpnav();
}

setupCanvas()