function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(0,0,0);
    noStroke();
    fill(255,255,0);
    ellipse(100, 200, 140, 140);
    //triangle vertices pos
    let triangleX = 100;
    let triangleY = 100;

    let x1 = triangleX;
    let y1 = triangleY + 100;
    let x2 = triangleX - 100;
    let y2 = triangleY + 200;
    let x3 = triangleX - 70;
    let y3 = triangleY + 20;

    fill(0, 0, 0);
    triangle(x1, y1, x2, y2, x3, y3);

    //ghost
    //body
    fill(255,0,0);
    rect(190, 190, 120, 80);
    ellipse(250, 190, 120, 120); 

    fill(255);
    ellipse(220, 190, 40, 40); //left eye outer
    ellipse(280, 190, 40, 40); // right eye outer

    fill(0, 0, 255);
    ellipse(220, 190, 25, 25); // left eye inner
    ellipse(280, 190, 25, 25);// right eye inner

  }
  