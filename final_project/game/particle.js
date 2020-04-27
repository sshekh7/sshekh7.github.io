class Particle {
  constructor(
    position,
    size,
    velocity,
    col,
    life,
    acceleration = createVector(0, 0)
  ) {
    this.position = position;
    this.size = size;
    this.velocity = velocity;
    this.velocity.limit(9);
    this.col = col;
    this.originalLife = this.life = life;
    this.acceleration = acceleration;
  }

  display() {
    const percentage = this.life / this.originalLife;

    push();
    strokeWeight(2);
    stroke(this.col, percentage * 255);
    noFill();
    ellipseMode(CENTER);
    ellipse(
      this.position.x,
      this.position.y,
      this.size * percentage,
      this.size * percentage
    );
    pop();
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.life--;
  }

  isDead() {
    return this.life <= 0;
  }
}

class PlayerBullet {
  constructor(position, velocity, col, size, damage = 2) {
    this.position = position;
    this.velocity = velocity;
    this.col = col;
    this.size = size;
    this.damage = 4;

    this.collided = false;
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    ellipseMode(CENTER);
    fill(this.col);
    noStroke();
    ellipse(0, 0, this.size, this.size);
    pop();
  }

  update() {
    this.position.add(this.velocity);
  }

  isDead() {
    return this.collided || this.isOutside();
  }

  isOutside() {
    return (
      this.position.x < 0 + this.size ||
      this.position.x > width - this.size ||
      this.position.y < 0 + this.size ||
      this.position.y > height - this.size
    );
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
