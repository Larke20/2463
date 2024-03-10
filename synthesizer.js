let synth;
let filter;
let lfo;
let distortion;
let distortionSlider;
let keyboard = {
  'a': { note: 'C4', pressed: false },
  's': { note: 'D4', pressed: false },
  'd': { note: 'E4', pressed: false },
  'f': { note: 'F4', pressed: false },
  'g': { note: 'G4', pressed: false },
  'h': { note: 'A4', pressed: false },
  'j': { note: 'B4', pressed: false },
  'k': { note: 'C5', pressed: false },
  'l': { note: 'D5', pressed: false }
};

function setup() {
  createCanvas(800, 500);

  synth = new Tone.PolySynth().toDestination();

  //filter
  filter = new Tone.Filter({
    frequency: 1000,
    type: 'lowpass',
    rolloff: -12
  });

  //lfo modulation
  lfo = new Tone.LFO('4n', 400, 1000).start().connect(filter.frequency);
  synth.connect(filter);

  //mod slider
  modulationSlider = createSlider(0, 100, 50);
  modulationSlider.position(900, 300);

  //filter Slider
  filterSlider = createSlider(20, 20000, 1000, 100);
  filterSlider.position(700, 300);

  //distortion Slider
  distortionSlider = createSlider(0, 1, 0.5, 0.01);
  distortionSlider.position(500, 300);

  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
}

//play on keypress
function onKeyDown(event) {
  let key = keyboard[event.key];
  if (key) {
    key.pressed = true;
    synth.triggerAttack(key.note);
  }
}
//release on key letgo
function onKeyUp(event) {
  let key = keyboard[event.key];
  if (key) {
    key.pressed = false;
    synth.triggerRelease(key.note);
  }
}

function draw() {
  background(170,0,100);
  text('Press keys from A to K to play notes', 100, 20);

  //slidertxt
  text('Modulation', 500, 150);
  text('Filter', 300, 150);
  text('Distortion', 100, 150);


    let keyboardKeys = ["Keys","A","S","D","F","G","H","J","K","L"];
    let notes = ["Notes", "C4","D4","E4","F4","G4","A4","B4","C5","D5"];

    let keyWidth = 60;
    let keyHeight = 40;
    let xStart = 50;
    let yStart = 300;
    //key rect
    for (let i = 0; i < keyboardKeys.length; i++) {
        let x = xStart + i * (keyWidth + 10);
        let y = yStart;
    
        //rect for key
        fill(200);
        rect(x, y, keyWidth, keyHeight);
    
        //txt for key
        textAlign(CENTER, CENTER);
        fill(0);
        text(keyboardKeys[i], x + keyWidth / 2, y + keyHeight / 2);
    }
    //note rect
    for (let i = 0; i < notes.length; i++) {
        let x = xStart + i * (keyWidth + 10);
        let y = yStart + keyHeight + 10;
    
        //rect for note
        fill(200);
        rect(x, y, keyWidth, keyHeight);
    
        //text for note
        textAlign(CENTER, CENTER);
        fill(0);
        text(notes[i], x + keyWidth / 2, y + keyHeight / 2);
    }
}
