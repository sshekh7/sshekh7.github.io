class GameManager {
  constructor() {}

  initGame() {
    this.sperm = new Sperm();

    this.coronas = [];
    this.enemiesFollow = [];
    this.enemiesShoot = [];
    this.playerBullets = [];
    this.enemyBullets = [];
    this.particleSystems = [];

    this.showRedBack = 0;

    this.playerLungs = 3;
    this.spermLife = 100;
    this.score = 0;

    this.isPlaying = false;

    this.initEnemyFollow();
    this.initEnemyShoot();
    this.initCorona();

    setTimeout(() => {
      this.soundManager.background.setLoop(true);
      this.soundManager.background.play();
      this.soundManager.background.setVolume(0.03);
    }, 1000);

    this.updateSpermLifeUI();
    this.updateLungsCountUI();
    // this.updateScoreUI();
  }

  updateScoreUI() {
    const inGameUI = this.screenManager.inGameUI;
    const gameOver = this.screenManager.gameOver;

    inGameUI.querySelector('#scoreText').innerHTML = `Score: ${this.score}`;
    gameOver.querySelector('h3').innerHTML = `Score: ${this.score}`;
    console.log(gameOver.querySelector('h3'));
  }

  updateSpermLifeUI() {
    const inGameUI = this.screenManager.inGameUI;
    const lifePercentage = (this.spermLife / 100) * 100;

    inGameUI.querySelector('#spermLife').style.width = `${lifePercentage}%`;
  }

  updateLungsCountUI() {
    const inGameUI = this.screenManager.inGameUI;

    inGameUI.querySelector('#lungsContainer').innerHTML = Array(
      this.playerLungs
    )
      .fill(1)
      .reduce(
        (acc, i) =>
          acc +
          ' <img src="assets//images/lungs.png" alt="Lungs" height="24" />',
        ''
      );
  }

  initSoundManager() {
    this.soundManager = new SoundManager();
  }

  initScreenManager() {
    this.screenManager = new ScreenManager();

    this.screenManager.menuScreen
      .querySelector('#play')
      .addEventListener('click', () => {
        this.initGame();
        this.play();
        this.updateScoreUI();
      });


    this.screenManager.gameOver
      .querySelector('#retry')
      .addEventListener('click', () => {
        this.play();
      });

    this.screenManager.gameOver
      .querySelector('#exit')
      .addEventListener('click', () => {
        this.initGame();
        this.soundManager.stopAllSounds();
        this.screenManager.hideAllScreens();

        this.screenManager.menuScreen.style.display = 'flex';
      });

    this.screenManager.inGameUI
      .querySelector('#pauseBtn')
      .addEventListener('click', () => this.pause());

    this.screenManager.pauseMenu
      .querySelector('#resume')
      .addEventListener('click', () => this.play());

    this.screenManager.pauseMenu
      .querySelector('#exit')
      .addEventListener('click', () => {
        this.initGame();
        this.soundManager.stopAllSounds();
        this.screenManager.hideAllScreens();

        this.screenManager.menuScreen.style.display = 'flex';
      });
  }

  showMenuScreen() {
    this.screenManager.hideAllScreens();

    this.screenManager.menuScreen.style.display = 'flex';
  }

  gameOver() {
    if (this.spermLife <= 0 || this.playerLungs <= 0) {
      this.screenManager.gameOver.style.display = 'flex';
      this.updateScoreUI();
      this.soundManager.stopAllSounds();

      this.initGame();
      this.soundManager.stopAllSounds();
    }
  }

  play() {
    this.isPlaying = true;

    this.screenManager.hideAllScreens();
    this.screenManager.inGameUI.style.display = 'flex';
  }

  pause() {
    this.isPlaying = false;

    this.screenManager.pauseMenu.style.display = 'flex';
  }

  initCorona() {
    this.coronaGenerationTime = 7 * 60;
    this.coronaGeneration = 0;
    this.coronaMinGenerationTime = 6 * 60;
    this.coronaMaxGenerationTime = 12 * 60;
    this.coronaIncreaseDiffRate = 30 * 60;
    this.coronaIncreaseDiff = this.coronaIncreaseDiffRate;
    this.coronaLife = 10;
    this.coronaMinLife = 10;
    this.coronaMaxLife = 30;

    this.coronaIsFire = false;
    this.coronaMaxCount = 100;
  }

  increaseCoronaDifficulty() {
    this.coronaIncreaseDiff--;
    if (this.coronaIncreaseDiff <= 0) {
      this.coronaIncreaseDiff = this.coronaIncreaseDiffRate;

      this.coronaGenerationTime = constrain(
        (this.coronaGeneration -= 30),
        this.coronaMinGenerationTime,
        this.coronaMinGenerationTime
      );

      this.coronaLife = constrain(
        this.coronaLife + 2,
        this.coronaMinLife,
        this.coronaMaxLife
      );

      this.coronaIsFire = true;
    }
  }

  generateCorona() {
    this.coronaGeneration--;

    if (
      this.coronaGeneration <= 0 &&
      this.coronas.length < this.coronaMaxCount
    ) {
      this.coronaGeneration = this.coronaGenerationTime;

      const position = createVector(
        random(50, width - 50),
        random(50, height - 50)
      );
      const life = this.coronaLife;
      const timeToExplode = 600;
      const isFire = this.coronaIsFire;
      const fireRate = 150;

      const corona = new CoronaVirus(
        position,
        life,
        timeToExplode,
        isFire,
        fireRate
      );

      this.coronas.push(corona);
    }
  }

  initEnemyFollow() {
    this.enemyFollowGenerationCount = 1;
    this.enemyFollowMinGenerationCount = 1;
    this.enemyFollowMaxGenerationCount = 3;

    this.enemyFollowIncreaseDiffRate = 20 * 60;
    this.enemyFollowIncreaseDiff = this.enemyFollowIncreaseDiffRate;

    this.enemyFollowGenerationTime = 5 * 60;
    this.enemyFollowGeneration = 0;
    this.enemyFollowMinGenerationTime = 3 * 60;
    this.enemyFollowMaxGenerationTime = 5 * 60;

    this.enemyFollowMaxCount = 15;
  }

  increaseEnemyFollowDifficulty() {
    this.enemyFollowIncreaseDiff--;
    if (this.enemyFollowIncreaseDiff <= 0) {
      this.enemyFollowIncreaseDiff = this.enemyFollowIncreaseDiffRate;

      this.enemyFollowGenerationTime = constrain(
        (this.enemyFollowGeneration -= 10),
        this.enemyFollowMinGenerationTime,
        this.enemyFollowMinGenerationTime
      );

      this.enemyFollowGenerationCount = constrain(
        this.enemyFollowGenerationCount + 1,
        this.enemyFollowMinGenerationCount,
        this.enemyFollowMaxGenerationCount
      );
    }
  }

  generateEnemyFollow() {
    this.enemyFollowGeneration--;
    if (
      this.enemyFollowGeneration <= 0 &&
      this.enemiesFollow.length < this.enemyFollowMaxCount
    ) {
      this.enemyFollowGeneration = this.enemyFollowGenerationTime;

      for (let i = 0; i < this.enemyFollowGenerationCount; i++) {
        const position = createVector(random(0, width), random(0, height));
        const speed = 1.3;
        const life = 4;
        const size = 20;

        const enemyFollow = new EnemyFollow(position, speed, life, size);

        this.enemiesFollow.push(enemyFollow);
      }
    }
  }

  generateEnemyShoot() {
    this.enemyShootGeneration--;
    if (
      this.enemyShootGeneration <= 0 &&
      this.enemyShootEnabled &&
      this.enemiesShoot.length < this.enemyShootMaxCount
    ) {
      this.enemyShootGeneration = this.enemyShootGenerationTime;

      for (let i = 0; i < this.enemyShootGenerationCount; i++) {
        const position = createVector(random(0, width), random(0, height));
        const speed = 1.3;
        const life = 4;
        const size = 20;

        const enemyShoot = new EnemyShoot(position, speed, life, size);

        this.enemiesShoot.push(enemyShoot);
      }
    }
  }

  increaseEnemyShootDifficulty() {
    this.enemyShootIncreaseDiff--;
    if (this.enemyShootIncreaseDiff <= 0) {
      if (this.enemyShootEnabled) {
        this.enemyShootIncreaseDiff = this.enemyShootIncreaseDiffRate;

        this.enemyShootGenerationTime -= 10;

        this.enemyShootGeneration = constrain(
          (this.enemyShootGeneration -= 10),
          this.enemyShootMinGenerationTime,
          this.enemyShootMinGenerationTime
        );

        this.enemyShootGenerationCount = constrain(
          this.enemyShootGenerationCount + 1,
          this.enemyShootMinGenerationCount,
          this.enemyShootMaxGenerationCount
        );
      }

      this.enemyShootEnabled = true;
    }
  }

  initEnemyShoot() {
    this.enemyShootGenerationCount = 1;
    this.enemyShootMinGenerationCount = 1;
    this.enemyShootMaxGenerationCount = 3;

    this.enemyShootIncreaseDiffRate = 30 * 60;
    this.enemyShootIncreaseDiff = this.enemyFollowIncreaseDiffRate;

    this.enemyShootGenerationTime = 10 * 60;
    this.enemyShootGeneration = 0;
    this.enemyShootMinGenerationTime = 6 * 60;
    this.enemyShootMaxGenerationTime = 8 * 60;

    this.enemyShootMaxCount = 3;

    this.enemyShootEnabled = false;
  }

  renderEnemiesFollow() {
    this.increaseEnemyFollowDifficulty();
    this.generateEnemyFollow();

    this.enemiesFollow = this.enemiesFollow.filter((enemy, i) => {
      enemy.follow(this.sperm);
      enemy.stayAwayToOtherEnemies(this.enemiesFollow, i);

      enemy.update();
      enemy.display();

      if (enemy.attack(this.sperm)) {
        this.spermLife -= 4;

        this.updateSpermLifeUI();

        this.sperm.redColor = 4;

        if (this.soundManager.playerDamage.isPlaying()) {
          this.soundManager.playerDamage.stop();
        }
        this.soundManager.playerDamage.setVolume(0.1);
        this.soundManager.playerDamage.play();
      }

      return !enemy.isDead();
    });
  }

  render() {
    if (this.isPlaying) {
      this.showRedBack--;
      if (this.showRedBack > 0) {
        background(color(200, 50, 50));
      }

      this.renderCoronas();
      this.renderPlayerBullets();
      this.renderSperm();
      this.renderEnemiesFollow();
      this.renderParticleSystems();
      this.gameOver();
    }
  }

  renderPlayerBullets() {
    this.playerBullets = this.playerBullets.filter(bullet => {
      bullet.update();
      bullet.display();

      this.coronas.forEach(corona => {
        if (bullet.collide(corona) && !bullet.collided) {
          this.score += 100;

          this.updateScoreUI();

          bullet.collided = true;
          corona.life -= bullet.damage;

          const position = bullet.position.copy();
          const size = 5;
          const life = 20;
          const col = color(240, 240, 240);
          const speed = 2.5;
          const count = 7;
          const oppositeDir = bullet.velocity.copy();
          oppositeDir.mult(-1);
          oppositeDir.setMag(0.3);

          const particleSystem = new ParticleSystem(
            position,
            size,
            life,
            col,
            speed,
            count,
            oppositeDir
          );

          if (this.soundManager.playerShoot.isPlaying()) {
            this.soundManager.playerShoot.stop();
          }
          this.soundManager.playerShoot.setVolume(0.1);
          this.soundManager.playerShoot.play();

          this.particleSystems.push(particleSystem);
        }
      });

      if (!bullet.collided) {
        this.enemiesFollow.forEach(enemyFollow => {
          if (bullet.collide(enemyFollow) && !bullet.collided) {
            this.score += 20;

            this.updateScoreUI();

            bullet.collided = true;
            enemyFollow.life -= bullet.damage;

            const position = bullet.position.copy();
            const size = 5;
            const life = 20;
            const col = color(240, 240, 240);
            const speed = 2.5;
            const count = 7;
            const oppositeDir = bullet.velocity.copy();
            oppositeDir.mult(-1);
            oppositeDir.setMag(0.3);

            const particleSystem = new ParticleSystem(
              position,
              size,
              life,
              col,
              speed,
              count,
              oppositeDir
            );

            if (this.soundManager.playerShoot.isPlaying()) {
              this.soundManager.playerShoot.stop();
            }
            this.soundManager.playerShoot.setVolume(0.1);
            this.soundManager.playerShoot.play();

            this.particleSystems.push(particleSystem);
          }
        });
      }

      if (!bullet.collided) {
        this.enemiesShoot.forEach(enemyShoot => {
          if (bullet.collide(enemyShoot) && !bullet.collided) {
            this.score += 30;

            this.updateScoreUI();

            bullet.collided = true;
            enemyShoot.life -= bullet.damage;

            const position = bullet.position.copy();
            const size = 5;
            const life = 20;
            const col = color(240, 240, 240);
            const speed = 2.5;
            const count = 7;
            const oppositeDir = bullet.velocity.copy();
            oppositeDir.mult(-1);
            oppositeDir.setMag(0.3);

            const particleSystem = new ParticleSystem(
              position,
              size,
              life,
              col,
              speed,
              count,
              oppositeDir
            );

            if (this.soundManager.playerShoot.isPlaying()) {
              this.soundManager.playerShoot.stop();
            }
            this.soundManager.playerShoot.setVolume(0.1);
            this.soundManager.playerShoot.play();

            this.particleSystems.push(particleSystem);
          }
        });
      }

      return !bullet.isDead() && !bullet.collided;
    });
  }

  renderCoronas() {
    this.increaseCoronaDifficulty();
    this.generateCorona();

    this.coronas = this.coronas.filter(corona => {
      corona.update();
      corona.display();

      const bullets = corona.fire();

      if (corona.isExploded()) {
        this.showRedBack = 2;
        this.playerLungs--;

        this.updateLungsCountUI();

        const position = corona.position.copy();
        const size = 15;
        const life = 90;
        const col = color(100, 240, 100);
        const speed = 3;
        const count = 7;
        const oppositeDir = createVector();

        const particleSystem = new ParticleSystem(
          position,
          size,
          life,
          col,
          speed,
          count,
          oppositeDir
        );
        if (this.soundManager.coronaDead.isPlaying()) {
          this.soundManager.coronaDead.stop();
        }
        this.soundManager.coronaDead.setVolume(0.1);
        this.soundManager.coronaDead.play();

        this.particleSystems.push(particleSystem);
      }

      return !corona.isExploded() && !corona.isDead();
    });
  }

  renderParticleSystems() {
    this.particleSystems = this.particleSystems.filter(pS => {
      pS.display();

      return !pS.isDead();
    });
  }

  renderSperm() {
    const bullet = this.sperm.fire();

    if (bullet) {
      this.playerBullets.push(bullet);

      if (this.soundManager.playerShoot.isPlaying()) {
        this.soundManager.playerShoot.stop();
      }
      this.soundManager.playerShoot.setVolume(0.1);
      this.soundManager.playerShoot.play();
    }

    this.sperm.update();
    this.sperm.display();
  }
}
