let gameState = 0; //0: non started; 1: started game; 2; end game
let startTime;
let bugs = []; //hold bugs
let initialBugSpeed = 1;
let score = 0;
let img;
let bgm; //fx
let bugkill; //fx
let miss; //fx
let gamestart; //fx
let gameover; //fx
let gameoverSoundPlayed = false;//fx playtime
let bugkillPlayed = false; //fx playtime
let missPlayed = false; //fx playtime

function preload() {
    img = loadImage('roachbug1.png');
    //game fx
    bgm = new Tone.Player("bgm.mp3").toDestination();
    bugkill = new Tone.Player("bugkill.mp3").toDestination();
    miss = new Tone.Player("miss.mp3").toDestination();
    gamestart = new Tone.Player("gamestart.mp3").toDestination();
    gameover = new Tone.Player("gameover.mp3").toDestination();

    bgm.volume.value = -5;
    bugkill.volume.value = 1;
    miss.volume.value = 4;
    gameover.volume.value = -10
}
function setup(){
    createCanvas(800,600);
}
function draw(){
    background(245, 245, 220);

    if (gameState === 0) {
        textSize(20);
        textAlign(CENTER, TOP);
        text("Good luck.", width / 2, 50);
        text("[--press ENTER to start--]", width / 2, 80);
    } 
    else if(gameState === 1){
        let timer = 30 - int((millis() - startTime) /1000);
        textSize(20);
        textAlign(LEFT, TOP);
        text("Time: " + timer, 50 , 30);
        text("Score: " + score, 150, 30);

        //spawn bugs
        if (frameCount % 40 === 0) { //spawn rate
            spawnBug();
        }
        
        //update & display bugs
        for (let i = bugs.length - 1; i >= 0; i--) {
            bugs[i].update();
            bugs[i].display();
        
            //rm bugs that have moved off-screen
            if (bugs[i].offScreen()) {
                bugs.splice(i, 1);
            }
        }

        if(timer <= 0){
            gameState = 2;
            console.log(gameState);
        }
    }
    else if(gameState === 2){
        if (!gameoverSoundPlayed) {
            gameover.start();
            bgm.stop();
            gameoverSoundPlayed = true;
        }
        textSize(30);
        textAlign(CENTER);
        text("GAME OVER, Your Score: " + score, width / 2, 50);
    }
    
}
//bugs
function spawnBug() {
    let bug = new Bug(random(width), random(height), initialBugSpeed);
    bugs.push(bug);
}
//enter game
function keyPressed(){
    if(keyCode === ENTER && gameState === 0){
        startTime = millis();
        gameState = 1;
        bgm.start();
    }
}
//game function
function mouseClicked() {
    if (gameState === 1) {
        bugkillPlayed = false;
        missPlayed = false;
        for (let i = bugs.length - 1; i >= 0; i--) {
            let d = dist(mouseX, mouseY, bugs[i].x, bugs[i].y);
            let hitboxRadius = img.width / 2 * (initialBugSpeed / bugs[i].speed); //fix for hitbox
            if (d < hitboxRadius) { // bug click
                bugs.splice(i, 1); //remove clicked bug
                score++;
                initialBugSpeed += 0.3;
                if(!bugkillPlayed){
                    bugkill.start();
                    bugkillPlayed = true;
                }
            }
            if(!missPlayed){
                miss.start();
                missPlayed = true;
            }
        }
    }
}
//bugs
function speedUpBugs() {
    for (let i = 0; i < bugs.length; i++) {
        bugs[i].speed *= 1.5; 
    }
}
//bugs
class Bug {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.direction = random() > 0.5 ? 1 : -1;
    }

    update() {
        this.x += this.speed * this.direction;
    }

    display() {
        imageMode(CENTER);
        if (this.direction > 0) {
            push(); 
            translate(this.x, this.y);
            scale(-1, 1); 
            image(img, 0, 0);
            pop();
        } else {
            image(img, this.x, this.y);
        }
    }

    offScreen() {
        return (this.x < -img.width / 2 || this.x > width + img.width / 2);
    }
}