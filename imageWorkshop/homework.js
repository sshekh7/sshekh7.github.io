// let angle = 0;
// let funimage;
// let makefunimage;
var makefunimage;
var ifsnake;
var ifclicked = false;
var mycolor;
var score;
var snakeX;
var snakeY;
var endscreen = false;
function preload(){
  makefunimage = loadImage("images/snake.png");
  // funimage = createImg("images/giphy.gif");
  // makefunimage = createImg("images/giphy.gif");
}
function setup(){

  createCanvas(windowWidth, windowHeight);
  snakeX = random(25, width-25);
  snakeY = random(25, width-25);
  snakeDim = 200;
  score = 0;
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
}

function draw()
{
image(makefunimage, snakeX, snakeY, 200, 200);
if(score === 20)
{
    for(let i = 0; i < 30; i++)
    {
      // image(makefunimage,300, 300, 309, 156);
      // createImg.position(50, 100);
      image(makefunimage, random(width-100), random(height-100), 200, 200);
    }
}

}

function mouseClicked(){
  mycolor = get(mouseX, mouseY);
  if(red(mycolor)===178 || red(mycolor)===225)
  {
    ifclicked = true;
    score++;
    snakeX = random(25, width-25);
    snakeY = random(25, height-25);
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
