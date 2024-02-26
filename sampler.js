let samples = [];
let reverb;
let reverbSlider;
let reverbActive = false;

let button1, button2, button3, button4;

function preload(){
    samples[0] = loadSound('fart.mp3');
    samples[1] = loadSound('wrongbuzzer.mp3');
    samples[2] = loadSound('augh.mp3');
    samples[3] = loadSound('vineboom.mp3');

}
function setup(){
    createCanvas(600,600);
    background(200,0,220, 120);


    //buttons
    button1 = createButton('Fart');
    button1.position(500,200);
    button1.mousePressed(playSample1);

    button2 = createButton('Buzzer');
    button2.position(630,200);
    button2.mousePressed(playSample2);
    button3 = createButton('Augh');
    button3.position(780,200);
    button3.mousePressed(playSample3);

    button4 = createButton('VineBoom');
    button4.position(900,200);
    button4.mousePressed(playSample4);
    //reverb stuff
    reverbSlider = createSlider(0, 100, 0, 1);
    reverbSlider.position(500,500);

    reverb = new p5.Reverb();
    for (let i = 0; i < samples.length; i++) {
        reverb.process(samples[i]);
    }
    toggleReverbButton = createButton('Toggle Reverb');
    toggleReverbButton.position(500, 470);
    toggleReverbButton.mousePressed(toggleReverb);
    
}
function draw() {
    // reverb
    let reverbVal = reverbSlider.value();
    if (reverbActive) {
        reverb.drywet(reverbVal);
        toggleReverbButton.style('background-color', 'green');
    } else {
        reverb.drywet(0);
        toggleReverbButton.style('background-color', 'white');
    }
}
function toggleReverb(){
    reverbActive = !reverbActive;
}
//sample 1
function playSample1() {
    if (samples[0].isPlaying()) {
      samples[0].stop();
      samples[0].play();
    } else {
      samples[0].play();
    }
}
//sample 2
function playSample2() {
    if (samples[1].isPlaying()) {
      samples[1].stop();
      samples[1].play();
    } else {
      samples[1].play();
    }
}
//sample 3
function playSample3() {
    if (samples[2].isPlaying()) {
      samples[2].stop();
      samples[2].play();
    } else {
      samples[2].play();
    }
}
//sample 4
function playSample4() {
    if (samples[3].isPlaying()) {
      samples[3].stop();
      samples[3].play();
    } else {
      samples[3].play();
    }
}
