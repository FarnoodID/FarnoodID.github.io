let numParticles = window.innerWidth < 768 ? 35 : 175;
const particles = [];

let touchActive = false;
let touchPos = { x: 0, y: 0 };

function setup() {
  const cnv = createCanvas(windowWidth, windowHeight);

  if (cnv && cnv.canvas) {
    cnv.canvas.style.pointerEvents = 'none';
    cnv.canvas.style.zIndex = '-1';
    cnv.canvas.style.userSelect = 'none';
  }

  cnv.style('position', 'fixed');
  cnv.style('inset', 0);
  cnv.style('display', 'block');

  clear();
  noStroke();

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  clear();

  const root = document.documentElement;
  const textColor = getComputedStyle(root).getPropertyValue('--text').trim();
  const mutedColor = getComputedStyle(root).getPropertyValue('--muted').trim();
  const particleCol = color(textColor);
  const lineCol = color(mutedColor);

  particles.forEach((particle, index) => {
    particle.update();
    particle.drawParticle(particleCol);
    particle.drawLines(particles.slice(index), lineCol);
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-1.5, 1.5), random(-1.5, 1.5));
    this.size = 3.8;
  }

  update() {

    let interaction = false; 
    let target = createVector(mouseX, mouseY);

    
    if (mouseX !== pmouseX || mouseY !== pmouseY) {
      interaction = true;
    }

    if (touchActive) {
      target = createVector(touchPos.x, touchPos.y);
      interaction = true;
    }

    if (interaction) {
      const dir = p5.Vector.sub(target, this.position);
      const distance = dir.mag();

      if (distance < 120) {
        dir.normalize();
        dir.mult(0.3);
        this.velocity.add(dir);
        this.velocity.limit(2.5);
      }
    }

    this.position.add(this.velocity);
    this.bounceEdges();
  }

  bounceEdges() {
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }

  drawLines(others, lineCol) {
    others.forEach(other => {
      const d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      
      if (d < 100) {
        const alpha = map(d, 0, 100, 230, 0);
        stroke(red(lineCol), green(lineCol), blue(lineCol), alpha);
        line(this.position.x, this.position.y, other.position.x, other.position.y);
      }
    });
  }

  drawParticle(col) {
    noStroke();
    fill(red(col), green(col), blue(col), 180);
    circle(this.position.x, this.position.y, this.size);
  }
}

function touchStarted() {
  if (touches.length > 0) {
    touchActive = true;
    touchPos.x = touches[0].x;
    touchPos.y = touches[0].y;
  }
}

function touchMoved() {
  if (touches.length > 0) {
    touchPos.x = touches[0].x;
    touchPos.y = touches[0].y;
  }
}

function touchEnded() {
  touchActive = false;
}