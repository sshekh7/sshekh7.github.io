class CoronaVirus {
  constructor(
    position,
    life = 10,
    timeToExplode = 600,
    isFire = true,
    fireRate = 150
  ) {
    this.position = position;
    this.life = life;
    this.nodes = Array(7).fill(1);
    this.size = 25;
    this.off = 0;

    this.isFire = isFire;
    this.fireRate = fireRate;
    this.fireCooldown = this.fireRate;
    this.bulletSpeed = 6;

    this.timeToExplode = timeToExplode;
    this.initNodes();
  }

  isDead() {
    return this.life <= 0;
  }

  isExploded() {
    return this.timeToExplode <= 0;
  }

  display() {
    this.displayNodes();

    push();
    translate(this.position.x, this.position.y);

    const timeInSeconds = Math.round(this.timeToExplode / 60);
    fill(color(240, 100, 100));
    textSize(14);
    text(timeInSeconds, -5 * timeInSeconds.toString().length, -this.size - 10);

    noStroke();
    fill(color(120, 240, 100));
    ellipseMode(CENTER);
    ellipse(0, 0, this.size, this.size);
    pop();
  }

  update() {
    this.updateNodes();
    this.off += 0.01;
    this.timeToExplode--;
    if (this.isFire) {
      this.fireCooldown--;
    }
  }

  initNodes() {
    this.nodes = this.nodes.map(node => random(15, 25));
  }

  updateNodes() {}

  fire() {
    if (this.isFire && this.fireCooldown <= 0) {
      this.fireCooldown = this.fireRate;

      const bullets = [];

      let startRad = 0;
      const incrementRad = TWO_PI / this.nodes.length;

      this.nodes.forEach(node => {
        const position = this.position.copy();
        const velocity = p5.Vector.fromAngle(startRad);
        velocity.setMag(this.bulletSpeed);

        const col = color(100, 240, 100);
        const size = 10;

        bullets.push(new PlayerBullet(position, velocity, col, size));

        startRad += incrementRad;
      });

      return bullets;
    } else {
      return null;
    }
  }

  displayNodes() {
    let startRad = 0;
    const incrementRad = TWO_PI / this.nodes.length;
    const virusPos = this.position.copy();

    this.nodes.forEach(node => {
      const endPosition = p5.Vector.fromAngle(startRad);
      endPosition.setMag(noise(this.off) * node + this.size / 2).add(virusPos);
      push();
      stroke(color(240, 100, 100));
      strokeWeight(2);
      line(virusPos.x, virusPos.y, endPosition.x, endPosition.y);

      noStroke();
      fill(color(120, 240, 100));
      ellipseMode(CENTER);
      ellipse(endPosition.x, endPosition.y, 8, 8);
      pop();

      startRad += incrementRad;
    });
  }
}
