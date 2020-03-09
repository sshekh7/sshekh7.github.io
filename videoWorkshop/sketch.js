
let modem;
let canvas;
let soundButton;
let audioPlaying = false;
let mic;
let micLevel;

let t1000;
let t2Image;
let t2Button;
let t2Playing = false;

let videoSlider;

function preload(){
  modem = loadSound("audio/ModemSound.mp3");
  t2Image = loadImage("images/t2robot.jpg");
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("z-index", "-1");
  canvas.position(0,0);



  t1000 = createVideo(['videos/T1000Reforming.mp4']);
  t1000.position(0, 50);
  t1000.style("width", "300px");

  t2Button = createButton("Play T2 Video");
  t2Button.mousePressed(toggleT2Video);

  soundButton = createButton("Play Sound");
  soundButton.mousePressed(toggleModem);

  videoSlider = createSlider(1, 4, 1);

  mic = new p5.AudioIn();
  mic.start();
}

function toggleT2Video(){
  if(t2Playing){
    t1000.pause();

    t2Button.html('Play T2 Video');
  } else {
    t1000.loop();
    t2Button.html("Pause T2 Video");
  }
  t2Playing = !t2Playing;
}

function toggleModem(){
  if(audioPlaying){
    modem.pause();
    modem.rate(2);
    soundButton.html('Play Sound');
  } else {
    modem.loop();
    soundButton.html('Stop Modem');
  }
  audioPlaying = !audioPlaying;
}

function draw(){
let micFill = map(micLevel, 0.002, 0.3, 0, 255);
background(t2Image);
t1000.speed(videoSlider.value());
micLevel = mic.getLevel();
let newLevel = map(micLevel,0.002, 0.3, 0, 300);
fill(255);
ellipse(width/2, height/2, newLevel, newLevel);
let mapSound = map(mouseX, 0, windowWidth, -2, 4);
modem.rate(mapSound);

}
