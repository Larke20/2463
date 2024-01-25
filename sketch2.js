function setup() {
    createCanvas(300, 300);
  }
  
  function draw() {
    background(225);

    blendMode(BLEND);
    noStroke();

    fill(255, 0, 0, 80)
    ellipse(150, 110, 80, 80);

    fill(0, 0, 255, 80)
    ellipse(120, 150, 80, 80);

    fill(0, 255, 0, 80)
    ellipse(180, 150, 80, 80);
  }