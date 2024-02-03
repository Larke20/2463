
//default color & brush size
let currentColor = 'black';
let currentBrushSize = 10;

function setup(){
    createCanvas(1300,750);
    background(255);
    //color selection
    let colorSwatches = document.querySelectorAll('.color');
    colorSwatches.forEach(function(swatch) {swatch.addEventListener('click', function() {currentColor = this.style.backgroundColor;});});
    //brush size selection
    let brushSizeDropdown = document.getElementById('brushSizeDropdown');
    brushSizeDropdown.addEventListener('change', function() {currentBrushSize = parseInt(this.value);});
    //clear canvas
    let clearCanvasButton = document.getElementById('clearCanvasButton');
    clearCanvasButton.addEventListener('click', function() {clearCanvas();});


}
//drawing
function draw(){
    if(mouseIsPressed){
        strokeWeight(currentBrushSize);
        stroke(currentColor);
        if (prevX !== undefined && prevY !== undefined) {
            line(prevX, prevY, mouseX, mouseY);
        }
        prevX = mouseX;
        prevY = mouseY;
    } else {
        prevX = undefined;
        prevY = undefined;
    }
}
function clearCanvas(){
    background(255);
}
