let sprites = [];

function preload(){
    lime = loadImage('lime.png');
    ninja = loadImage('ninja.png');
    robot = loadImage('robot.png');
}
function setup(){
    createCanvas(1000,800);
    sprite = new Sprite;
    frameRate(24);

    sprites.push(new Sprite(width/2, height/2, lime));
    sprites.push(new Sprite(width/3, height/3, ninja));
    sprites.push(new Sprite(width/4, height/ 4, robot));
}
function draw(){
    background(220);
    for (let i = 0; i < sprites.length; i++) {
        sprites[i].update();
        sprites[i].show();
        sprites[i].move();
    }

}
class Sprite{
    constructor(x, y, image){
        this.spritesheet = image;
        this.frameWidth = 80;
        this.frameHeight = 80;
        this.frameCount = 6;
        this.frameIndex = 0;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.direction = 0;
        this.isMoving = false;
    }
    update(){
        if(this.isMoving){
            this.frameIndex = (this.frameIndex + 1) % this.frameCount;
        }
        else{
            this.frameIndex = 0;
        }
    }
    show(){
        push();
        translate(this.x + this.frameWidth / 2, this.y + this.frameHeight / 2); 
        if(this.direction === -1){
            scale(-1, 1); 
        }
        let offsetX = this.frameIndex * this.frameWidth;
        let offsetY = 0;
        
        image(this.spritesheet, -this.frameWidth / 2, -this.frameHeight / 2, this.frameWidth, this.frameHeight, offsetX, offsetY, this.frameWidth, this.frameHeight);
        pop(); 
    }
    move(){
        if(this.isMoving){
            this.x += this.speed * this.direction;
        }
    }

}
function keyPressed(){
    if(keyCode === RIGHT_ARROW){
        for (let i = 0; i < sprites.length; i++) {
            sprites[i].direction = 1;
            sprites[i].isMoving = true;
        }
    }
    else if(keyCode === LEFT_ARROW){
        for (let i = 0; i < sprites.length; i++) {
            sprites[i].direction = -1;
            sprites[i].isMoving = true;
        }
    }
}
function keyReleased() {
    if(keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW){
        for (let i = 0; i < sprites.length; i++) {
            sprites[i].isMoving = false;
        }
    }
}
