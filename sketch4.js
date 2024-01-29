function setup() {
    createCanvas(400,400);
}
function draw(){
    background(0,0,120);
    translate(width / 2, height / 2); //center origin
    let radius = 100; 
    //outer
    fill(255);
    ellipse(0,0,radius*2.1);
    //inner
    fill(0,110,0);
    ellipse(0,0,radius*2);
    //star outer
    fill(255);
    drawStar(0,0,110,40,5);
    //star inner
    fill(255,0,0);
    drawStar(0,0,95,35,5);

}
function drawStar(x, y, outerRadius, innerRadius, vertices){
    let angle = TWO_PI / vertices;
    let halfAngle = TWO_PI / (vertices * 2);
    beginShape();
    for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
      let sx = x + cos(a) * outerRadius;
      let sy = y + sin(a) * outerRadius;
      vertex(sx, sy);
      let bx = x + cos(a + halfAngle) * innerRadius;
      let by = y + sin(a + halfAngle) * innerRadius;
      vertex(bx, by);
    }
    endShape(CLOSE);
}