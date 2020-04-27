class EnemyShoot {
  constructor(
    position,
    speed,
    life,
    size,
    distanceToFire = 450,
    fireRate = 90
  ) {
    this.position = position;
    this.speed = speed;
    this.life = life;
    this.size = size;

    this.distanceToFire = distanceToFire;
    this.fireRate = fireRate;
    this.fireCooldown = this.fireRate;
    this.bulletSpeed = 8;

    this.barrelRot = HALF_PI;

    this.velocity = createVector();
  }

  follow(sperm) {
    if (sperm.position.copy().dist(this.position) >= this.distanceToFire) {
      this.velocity = sperm.position.copy().sub(this.position);
      this.velocity.setMag(this.speed);
    } else {
      this.velocity.set(0, 0);
    }

    this.barrelRot = sperm.position
      .copy()
      .sub(this.position)
      .heading();
  }

  isDead() {
    return this.life <= 0;
  }

  display() {
    push();

    translate(this.position.x, this.position.y);

    fill(color(240, 100, 100));
    ellipseMode(CENTER);
    ellipse(0, 0, this.size - 3);

    pop();

    // Barrel Rot
    push();
    translate(this.position.x, this.position.y);

    fill(color(100, 240, 100));
    rectMode(CENTER);
    rotate(this.barrelRot + HALF_PI);
    rect(0, -10, 3, 20);
    pop();
  }

  update() {
    this.position.add(this.velocity);

    this.fireCooldown--;
  }

  stayAwayToOtherEnemies(enemies) {
    const maxDistance = this.size + 20;
    const forceStr = this.speed;

    enemies.forEach(enemy => {
      const dist = enemy.position.dist(this.position);
      if (dist !== 0 && dist < maxDistance) {
        const force = enemy.position.copy().sub(this.position);
        force.mult(-1);

        force.setMag(forceStr);

        this.position.add(force);
      }
    });
  }

  fire() {
    if (this.fireCooldown <= 0) {
      this.fireCooldown = this.fireRate;

      const pos = this.position.copy();
      const vel = p5.Vector.fromAngle(this.barrelRot);
      vel.setMag(this.bulletSpeed);
      const size = 4;
      const col = color(240, 100, 100);

      return new PlayerBullet(pos, vel, col, size);
    }

    return null;
  }
}

class EnemyFollow {
  constructor(position, speed, life, size) {
    this.position = position;
    this.speed = speed;
    this.life = life;
    this.size = size;

    this.attackRate = 60;
    this.attackCooldown = this.attackRate;

    this.velocity = createVector();
    this.acceleration = createVector();
  }

  follow(sperm) {
    this.velocity = sperm.position.copy().sub(this.position);
    this.acceleration.setMag(this.speed * 0.1);
  }

  display() {
    push();

    translate(this.position.x, this.position.y);

    rotate(frameCount / 10);

    fill(color(100, 240, 100));
    rectMode(CENTER);
    rect(0, 0, this.size, this.size);

    fill(color(240, 100, 100));
    ellipseMode(CENTER);
    ellipse(0, 0, this.size - 3);

    pop();
  }

  isDead() {
    return this.life <= 0;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.speed);
    this.position.add(this.velocity);
  }

  stayAwayToOtherEnemies(enemies, index) {
    const maxDistance = this.size + 20;
    const forceStr = this.size + 80;
    let repelled = false;

    enemies.forEach((enemy, i) => {
      const dist = enemy.position.dist(this.position);
      if (!repelled && i !== index && dist < maxDistance) {
        repelled = true;

        const force = enemy.position.copy().sub(this.position);
        force.mult(-1);

        force.setMag(forceStr);

        this.velocity.add(force);
      }
    });
  }

  attack(sperm) {
    this.attackCooldown--;
    if (this.attackCooldown <= 0 && this.collide(sperm)) {
      this.attackCooldown = this.attackRate;

      return true;
    }

    return false;
  }

  collide(target) {
    return (
      this.position.x < target.position.x + target.size &&
      this.position.x + this.size > target.position.x &&
      this.position.y < target.position.y + target.size &&
      this.position.y + this.size > target.position.y
    );
  }
}
