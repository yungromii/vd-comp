let isDaytime = false;

const GRID = 8;
const CELL = 1080 / GRID;

function setup() {
 createCanvas(1080, 1080);
 noStroke();
 frameRate(8);
   const currentHour = hour();
  isDaytime = (currentHour >= 7 && currentHour < 19);
}

function draw() {

  if (isDaytime == true) {
    background('#fcf9d2ff'); 
  } else {
    background('#000022'); 
  }
 
 const cz = random(0, 120);
 const sz = random(0, CELL);

 for (let gy = 0; gy < GRID; gy++) {

   for (let gx = 0; gx < GRID; gx++) {
     const cx = gx * CELL + CELL / 2;
     const cy = gy * CELL + CELL / 2;

     push();
     blendMode(MULTIPLY);
     fill('red');
     circle(cx, cy, cz);
     pop();

     push();
     blendMode(MULTIPLY);
     translate(cx, cy);
     rotate(random(TWO_PI)); 
     fill('green');
     rectMode(CENTER);
     rect(0, 0, sz, sz);
      
     pop();
       
   }
 }
}

function keyPressed() {
  if (key === 's') {
    saveGif('mySketch', 5);
  }

  
}