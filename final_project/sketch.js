p5.disableFriendlyErrors = true;

let gameManager;

function preload() {
  gameManager = new GameManager();
  gameManager.initSoundManager();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  gameManager.initScreenManager();
  gameManager.showMenuScreen();
}

function draw() {
  background(10);
  gameManager.render();
}

class ScreenManager {
  constructor() {
    this.loadingScreen = document.querySelector('#loadingScreen');
    this.menuScreen = document.querySelector('#menuScreen');
    this.pauseMenu = document.querySelector('#pauseMenu');
    this.gameOver = document.querySelector('#gameOver');
    this.inGameUI = document.querySelector('#inGameUI');
  }

  hideAllScreens() {
    Object.keys(this).forEach(screen => {
      this[screen].style.display = 'none';
    });
  }
}

class SoundManager {
  constructor() {
    this.coronaDead = loadSound("sounds/corona_dead.wav");
    this.enemyDamage = loadSound("sounds/enemy_damage.wav");
    this.enemyShoot = loadSound("sounds/enemy_shoot.wav");
    this.playerDamage = loadSound("sounds/player_damage.wav");
    this.playerShoot = loadSound("sounds/player_shoot.wav");
    this.background = loadSound("sounds/background.mp3");
  }

  stopAllSounds() {
    Object.keys(this).forEach(sound => {
      this[sound].stop();
      console.log(this[sound]);
    });
  }
}
