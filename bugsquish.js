let timer = 30;
let squishedBug;
let bugsSquished = 0;
let clickingOk = true;
let resetButton;

let bugs = [];
let bug;
let bugSpriteSheet;
let bugFrames = [];

function preload(){
    bugSpriteSheet = loadImage('bugsheet.png');
    squishedBug = loadImage('squished.png');
}

function setup(){
    createCanvas(700,700);
    for (let i = 0; i < 2; i++) {
        let frame = bugSpriteSheet.get(0, i * 32, 32, 32);
        bugFrames.push(frame);
    }
    for (let i = 0; i < 5; i++) {
        spawnBug(-2);
    }
    //reset
    resetButton = createButton('Reset');
    resetButton.position(1100,150);
    resetButton.mousePressed(resetBugSquish);
}

function draw(){
    background(190);
    textAlign(LEFT, TOP);
    textSize(32);
    fill(0);
    text("Time Left: " + timer, 10, 10);
    text("Score: " + bugsSquished, width/2, 10);

    for (let i = bugs.length - 1; i >= 0; i--) {
        bugs[i].update();
        bugs[i].show();
    }

    if(frameCount % 60 == 0 && timer > 0){
        timer--;
    }
    if(timer === 0){
        clickingOk = false;
    }
}
function spawnBug(ySpeed) {
    let bugSize = 32 * 2;
    let buffer = 50; //edge of canvas

    //random bug spawn area
    let randomX = random(buffer, width - buffer - bugSize);
    let randomY = random(buffer, height - buffer - bugSize);

    let bug = new Bug(randomX, randomY, bugFrames, ySpeed);
    bugs.push(bug);
}
function mousePressed() {
    if (clickingOk) {
        for (let i = bugs.length - 1; i >= 0; i--) {
            let scaleFactor = 2;
            let spriteHeight = bugs[i].sprite[bugs[i].frameIndex].height * scaleFactor;
            let bugTop = bugs[i].y;
            let bugBottom = bugs[i].y + spriteHeight;

            //squishing
            if (mouseX > bugs[i].x && mouseX < bugs[i].x + (bugFrames[0].width * scaleFactor) && mouseY > bugTop && mouseY < bugBottom) {
                //increase bug speed
                for (let j = 0; j < bugs.length; j++) {
                    bugs[j].increaseSpeed();
                }
                //updated speed
                let updatedSpeed = bugs[0].ySpeed;
                //remove squished bug
                bugs.splice(i, 1);
                // new bug with updated speed increase
                spawnBug(updatedSpeed);
                bugsSquished++;
                break;
            }
        }
    }
}
function resetBugSquish(){
    //resetting
    timer = 30;
    bugsSquished = 0;
    clickingOk = true;
}
class Bug{
    constructor(x, y, sprite, ySpeed){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.frameIndex = 0;
        this.frameDuration = 20;
        this.ySpeed = ySpeed;
        this.acceleration = 0.5;

    }

    update(){
 
        if(timer > 0){
            this.y += this.ySpeed;
            this.y += this.acceleration;
            //check bug boundaries
            if(this.y <= 0 || this.y + (this.sprite[this.frameIndex].height * 2) >= height){
                this.ySpeed *= -1;
    
                if(this.y <= 0){
                    this.y = 0;
                }else if(this.y + (this.sprite[this.frameIndex].height * 2) >= height){
                    this.y = height - (this.sprite[this.frameIndex].height * 2);
                }
            }
            if(frameCount % this.frameDuration === 0){
                this.frameIndex = (this.frameIndex + 1) % this.sprite.length;
            }
        }
    }
    show(){
        let scaleFactor = 2;
        //for use in bug orientation
        let spriteHeight = this.sprite[this.frameIndex].height * scaleFactor;
        let spriteWidth = this.sprite[this.frameIndex].width * scaleFactor;

        if (this.ySpeed < 0) {
            //upward
            image(this.sprite[this.frameIndex], this.x, this.y, spriteWidth, spriteHeight);
        } else {
            //downward
            let bugHeadPosition = this.y + spriteHeight; // adjust pos for bug head
            push();
            translate(this.x, bugHeadPosition);
            scale(1, -1);
            image(this.sprite[this.frameIndex], 0, 0, spriteWidth, spriteHeight);
            pop();
        }
    }
    increaseSpeed(){
        let minSpeed = -5;
        let speedIncrease = abs(this.ySpeed) * 0.1;
        this.ySpeed = max(this.ySpeed - speedIncrease, minSpeed);
    }
}
