var targets = [];
var crosshair;

function setup() {
  // put setup code here
  createCanvas(1280, 720);
  targets.push(new Target(50, [255, 0, 0]));
  crosshair = new Crosshair();
  noCursor();
}

function draw() {
  // put drawing code here
  background(50);
  for(var i = 0; i < targets.length; i++) {
    targets[i].draw();
  }
  crosshair.draw();
}

function mouseClicked() {
  if (crosshair.on(targets[targets.length - 1])) {
    targets[targets.length - 1].rgb = [0, 0, 255];
    targets.push(new Target(50, [255, 0, 0]));
  }
}

class Target {
  constructor(size, rgb) {
    this.size = size;
    this.rgb = rgb;
    this.x = random(0 + this.size, width - this.size);
    this.y = random(0 + this.size, height - this.size);
  }

  draw() {
    fill(this.rgb[0], this.rgb[1], this.rgb[2]);
    ellipse(this.x, this.y, this.size, this.size);
  }

  move(x, y) {
    this.x = lerp(this.x, x, 0.5);
    this.y = lerp(this.y, y, 0.5);
  }
}

class Crosshair {
  constructor() {
    this.x = mouseX;
    this.y = mouseY;
    this.rgb = [255, 255, 255];
    this.size = 20;
  }

  draw() {
    stroke(this.rgb[0], this.rgb[1], this.rgb[2]);
    this.move();
    line(this.x - this.size, this.y, this.x + this.size, this.y);
    line(this.x, this.y - this.size, this.x, this.y + this.size);
  }

  move() {
    this.x = mouseX;
    this.y = mouseY;
  }

  on(entity) {
    if (distance(entity, this) <= entity.size / 2) {
      return true;
    }
    else {
      return false;
    }
  }
}

function distance(entity1, entity2) {
  var x = (entity2.x - entity1.x) * (entity2.x - entity1.x)
  var y = (entity2.y - entity1.y) * (entity2.y - entity1.y)
  return sqrt(x + y);
}