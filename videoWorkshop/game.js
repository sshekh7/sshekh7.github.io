let bugs = []; // array of fire objects
let touch;
let final;
let enemy5;
let face_startX;
let face_startY;
let touchBool = false;
let startColor;
let jerry;
let end_x;
let end_y;
let font_random;
let what_font = 0;
let retry_button;
let retryBool = false;
let sound;
let last_video;


function preload(){
  final = loadImage('images/final.jpg');
  enemy5 = loadImage('images/crab_1.png');
  // enemy_gif = createImg('images/crab.gif');
  jerry = loadImage('images/temp.png');
  font_random = loadFont('fonts/helsinki.ttf');
  sound = loadSound('audio/crab.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  sound.play();
  face_startX = 10;
  face_startY = 10;
  end_x = random(100,width-100);
  end_y = random(70,height-70);
  // Create objects
  for (let i = 0; i < 20; i++) {
    bugs.push(new fire());
  }
}

function draw() {
  background(final);
  // noLoop();
  if(what_font === 0){
    textSize(70);
    textAlign(CENTER);
    textFont(font_random);
    fill(255, 204, 102);
    text("Take Me Home!!!", width/2, 100);
    // retry_button.hide();
  }
  if(what_font === 1){
    background(0,0,0);
    sound.stop();
    textSize(40);
    textAlign(CENTER);
    textFont(font_random);
    fill(255, 204, 102);
    text("You Lose. Refresh page to play again!!!", width/2, 100);
    playVideo();
    noLoop();

  }

  image(jerry, face_startX, face_startY, 40, 40);
  fill(250, 255, 1);
  rect(end_x, end_y, 55, 55, 20);

  for (let i = 0; i < bugs.length; i++) {
    bugs[i].move();
    bugs[i].display();
  }
}

function restart_game(){
  createCanvas(windowWidth, windowHeight);
  // Create objects
  for (let i = 0; i < 50; i++) {
    bugs.push(new fire());
  }
  face_startX = 10;
  face_startY = 10;
  end_x = random(100,width-100);
  end_y = random(70,height-70);
  retryBool = true;
  what_font = 0;
}

// function mouseClicked(){
//   startColor = get(mouseX, mouseY);
//   if(red(startColor)=== 254 || red(startColor) === 255 || red(startColor) === 135 || red(startColor) === 251){
//     touchBool = true;
//   }
//
// }
function playVideo(){
  last_video = createVideo(['videos/bass.mp4']);
  last_video.position(0,110);
  last_video.play();
}

function mouseDragged(){
  if(what_font === 0){
    face_startX = mouseX - 20;
    face_startY = mouseY - 20;
    intersection();
    // redraw();
    // touch = get(mouseX, mouseY);
    // if(red(touch) === 214 || red(touch) === 244) {
    //   blastGame();
    // }
    // if(red(touch) === 250) {
    //   endGame();
    // }
  }
}
function blastGame(){
  // createCanvas(windowWidth, windowHeight);
  // Create objects
  bugs = [];
  what_font = 1;
  touchBool = false;
}

function endGame(){
  // setup();
  face_startX = 10;
  face_startY = 10;
  end_x = random(100,width-100);
  end_y = random(70,height-70);
  // Create objects
  for (let i = 0; i < 10; i++) {
    bugs.push(new fire());
  }
}

function intersection(){
  for(let i = 0; i < bugs.length; i++){
    if(dist(face_startX+20, face_startY+20, bugs[i].x+20, bugs[i].y+20) < bugs[i].diameter-5){
      blastGame();
    }
  }
  if(dist(face_startX, face_startY,end_x,end_y) < 50){
    endGame();
  }
}
// fire class
class fire {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(20, 50);
    this.speed = 1;
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display() {
    // if(dist(this.x, this.y, face_startX, face_startY) > 50)
    // {
    push();
    // noLoop();
      image(enemy5, this.x, this.y, this.diameter+30, this.diameter+30);
    pop();
    // }
   // enemy_gif = createImg(enemy5);
   // enemy_gif.position(this.x, this.y);
   // enemy_gif.hide();

  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
