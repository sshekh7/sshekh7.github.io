class Sperm {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.rot = 0;
    this.barrelRot = HALF_PI;
    this.tailSize = 4;
    this.size = 20;

    this.speed = 5;
    this.velocity = createVector(0, 0);

    this.tailIndexToUpdate = 0;
    this.tails = Array(10).fill(1);

    this.wiggleDir = 1;
    this.wiggleDistance = 0;
    this.wiggleSpeed = 0.8;

    this.redColor = 0;

    this.fireRate = 10;
    this.fireCooldown = this.fireRate;
    this.bulletSpeed = 12;
    this.initTails();
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    if (this.redColor > 0) {
      fill(color(240, 100, 100));
    } else {
      fill(255);
    }
    ellipseMode(CENTER);
    rotate(this.rot);
    ellipse(0, 0, this.size, this.size - 5);
    pop();

    //  barrel
    push();
    translate(this.position.x, this.position.y);

    fill(120);
    rectMode(CENTER);
    rotate(this.barrelRot + HALF_PI);
    rect(0, -10, 3, 20);
    pop();

    this.displayTails();
  }

  update() {
    const sideLeftVector = p5.Vector.fromAngle(this.rot + HALF_PI);
    const maxDistance = 20;

    const wiggle = sideLeftVector
      .copy()
      .setMag(this.wiggleSpeed)
      .mult(this.wiggleDir);

    this.wiggleDistance += this.wiggleSpeed;

    if (this.wiggleDistance >= maxDistance) {
      this.wiggleDistance = 0;
      this.wiggleDir *= -1;
    }

    this.position.add(wiggle);

    this.updateTails();

    this.lookAtMouse();

    this.move();

    this.position.add(this.velocity);

    // Contain
    this.position.x = constrain(
      this.position.x,
      0 + this.size / 2,
      width - this.size / 2
    );
    this.position.y = constrain(
      this.position.y,
      0 + this.size / 2,
      height - this.size / 2
    );

    this.fireCooldown--;
    this.redColor--;
  }

  displayTails() {
    this.tails.forEach(tail => {
      push();
      fill(170);
      rectMode(CENTER);
      rect(tail.x, tail.y, this.tailSize, this.tailSize);
      pop();
    });
  }

  initTails() {
    const headingVector = p5.Vector.fromAngle(this.rot);
    const distance = 1;
    const startPos = this.position.copy();

    headingVector.mult(-1);
    headingVector.setMag(this.tailSize + distance);

    startPos.add(headingVector.copy().setMag(this.tailSize + distance));

    this.tails = this.tails.map(t => {
      const pos = startPos.add(headingVector);

      return pos.copy();
    });
  }

  updateTails() {
    const headingVector = p5.Vector.fromAngle(this.rot);
    const distance = 1;

    const sPos = this.position.copy();

    headingVector.mult(-1);
    sPos.add(headingVector.copy().setMag(this.tailSize + distance + 5));

    this.tails[0].set(sPos.x, sPos.y);

    for (let i = this.tails.length - 1; i >= 1; i--) {
      const startPos =
        i === 0 ? this.position.copy() : this.tails[i - 1].copy();

      startPos.add(headingVector.copy().setMag(this.tailSize + distance));

      this.tails[i].set(startPos.x, startPos.y);
    }
  }

  move() {
    if (keyIsPressed) {
      const forwardVector = p5.Vector.fromAngle(this.rot);
      const sideLeftVector = p5.Vector.fromAngle(this.rot + HALF_PI);
      const sideRightVector = p5.Vector.fromAngle(this.rot + HALF_PI + PI);
      this.velocity.set(0, 0);
      // w
      if (keyIsDown(87) || keyIsDown(119)) {
        this.velocity.add(forwardVector.copy().setMag(this.speed));
      }
      // s
      if (keyIsDown(83) || keyIsDown(115)) {
        this.velocity.add(
          forwardVector
            .copy()
            .setMag(this.speed)
            .mult(-1)
        );
      }
      // a
      if (keyIsDown(65) || keyIsDown(97)) {
        this.rot -= 0.1;
      }

      //   d
      if (keyIsDown(68) || keyIsDown(100)) {
        this.rot += 0.1;
      }
    } else {
      this.velocity.set(0, 0);
    }
  }

  lookAtMouse() {
    const mouseVector = createVector(mouseX, mouseY);
    const lookAtVector = mouseVector.copy().sub(this.position);
    this.barrelRot = lookAtVector.heading();
  }

  fire() {
    if (this.fireCooldown <= 0 && mouseIsPressed) {
      this.fireCooldown = this.fireRate;

      const pos = this.position.copy();
      const vel = p5.Vector.fromAngle(this.barrelRot);
      vel.setMag(this.bulletSpeed);
      const size = 4;
      const col = color(250, 250, 250);

      return new PlayerBullet(pos, vel, col, size);
    }

    return null;
  }
}
