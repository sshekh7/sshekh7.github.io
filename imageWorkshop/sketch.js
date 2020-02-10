let furby; //furbyImage

//furby position variables

let furbyX;
let furbyY;

//furby speed variables

let furbyXspeed;
let furbyYspeed;

//score variable
let score = 0;
// boolean
let endScreen = false;
// check mouse and furby collisons
let mouseCollide;

function preload(){
  furby = loadImage("images/snake.png"); // loading image from directory
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);

  furbyX = random(25, width-25);
  furbyY = random(25, height-25);
// move furby
  furbyXspeed = 2;
  furbyYspeed = 2;
  // for(let i  = 0; i < 300; i++)
  // {
  //   image(furby, random(width), random(height), 50, 50);
  // }
}

function draw() {
mouseCollide = dist(mouseX, mouseY, furbyX, furbyY);
// background(40,100,203);
for(let i = 0; i < windowWidth; i+=6)
{
  stroke(83, 214, 125);
  line(i,0,i,height);
}
for(let i = 3; i < windowWidth; i+=6)
{
  stroke(83, 214, 212);
  line(i,0,i,height);
}

textSize(30);
textAlign(CENTER);
fill(0);

text("Tag The Furby", width/2, 40);
textSize(25);
fill(random(255), random(255), random(255));
text("Score: " + score , width/2, 80);

// change the position of furby
// speed variables
furbyX = furbyX + furbyXspeed;
furbyY = furbyY + furbyYspeed;

if(furbyX >= width-25 || furbyX <= 0){
  furbyXspeed = furbyXspeed * -1;
}

if(furbyY >= height-25 || furbyY <= 0){
  furbyYspeed = furbyYspeed * -1;
}
// print(furbyX);
image(furby, furbyX, furbyY, 50, 50); //animated furby
image(furby, mouseX, mouseY, 30, 30); // furby image

// if collison happens add score, new random position of the furby and speed up
if(mouseCollide < 25){
  score++;
  furbyX = random(25, width-25);
  furbyY = random(25, height-25);

  furbyYspeed = furbyYspeed * 1.2;
  furbyXspeed = furbyXspeed * 1.2;
}

if(score == 10){
  endScreen = true;
}
if(endScreen == true){
  //trigger this custom function.
  endScreenfunction();
}

function endScreenfunction(){
  background(random(255), random(255), random(255));
  text("YOU WIN!!!!", width/2, 40);
  image(furby, mouseX, mouseY, mouseX, mouseY);
}
}

function mouseDragged(){
  // image(furby, mouseX, mouseY, 70, 70);
  line(mouseX, mouseY, pmouseX, pmouseY);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


// }
