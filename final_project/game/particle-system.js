class ParticleSystem {
  constructor(position, size, life, col, speed, count, oppositeDir) {
    this.position = position;
    this.size = size;
    this.life = life;
    this.col = col;
    this.speed = speed;
    this.count = count;
    this.oppositeDir = oppositeDir;
    // Fill particles temporary value
    this.particles = Array(this.count).fill(1);

    this.initParticles();
  }

  initParticles() {
    this.particles = this.particles.map(particle => {
      const velocity = createVector(
        random(-this.speed, this.speed),
        random(-this.speed, this.speed)
      );
      velocity.setMag(this.speed);

      return new Particle(
        this.position.copy(),
        this.size,
        velocity,
        this.col,
        this.life,
        this.oppositeDir
      );
    });
  }

  display() {
    this.particles = this.particles.filter(particle => {
      particle.update();
      particle.display();

      return !particle.isDead();
    });
  }

  isDead() {
    return this.particles.length === 0;
  }
}
