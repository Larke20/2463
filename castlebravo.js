let currentText = "Click for a free prize, def not bait!";
let newText = "BAITED, GET CASTLE BRAVO'D LOL XD";
let img;
let clicked = false;
let synth;
let distortion;

function preload(){
    img = loadImage('castlebravo.png');
}

function setup(){
    createCanvas(800, 400);
    background(100, 0, 0);
    textAlign(CENTER, TOP);
    textSize(32);
    fill(0);
    text(currentText, width / 2, 10);

    synth = new Tone.Synth().toDestination();
    distortion = new Tone.Distortion(0.8).toDestination();

}

function draw(){
    if(clicked){
        image(img, width/2 - img.width/2, 60);
    }
}

function mouseClicked(){
    currentText = newText;
    redrawCanvas();
    clicked = true;
    playnote();
}
function redrawCanvas(){
    clear();
    createCanvas(800,400);
    background(100,0,0);
    textAlign(CENTER, TOP);
    textSize(32);
    fill(0);
    text(currentText, width / 2, 10);

}
function playnote(){
    synth.connect(distortion);
    synth.triggerAttackRelease('A0', '4n');
}