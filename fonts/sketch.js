let font, pts = [];


let currentSample = 0.10;
let targetSample  = 0.10;
const SAMPLE_MIN  = 0.01
const SAMPLE_MAX  = 0.1;

let recording = false;
let frameCounter = 0;
const MAX_FRAMES = 60; // 저장할 최대 프레임 수

function preload(){ font = loadFont("Avara-Bold.otf"); }

function setup(){
  createCanvas(windowWidth, windowHeight);
noStroke();

}

function draw(){
  background("black");
  const TXT = "Romi World";
const SIZE = 120;

 // lerp ease currentSample toward targetSample (smooth animation)
  currentSample = lerp(currentSample, targetSample, 0.1);


  const b = font.textBounds(TXT, 0, 0, SIZE);
  const x = width/2  - (b.w/2 + b.x);
  const y = height/2 + (b.h/2 - (b.y - b.y));

  
  pts = font.textToPoints(TXT, x, y, SIZE, { sampleFactor: currentSample, simplifyThreshold: 0.001 });

 // for (const p of pts) circle(p.x, p.y, 15);

  const arr = pts.slice().sort((a,b) =>
  dist(a.x,a.y,mouseX,mouseY) - dist(b.x,b.y,mouseX,mouseY)
  );

  
  fill("white");
  for (const p of arr) {
    circle(p.x, p.y, 9);
  }

  stroke("white"); // 선의 색 (중간 회색)
  strokeWeight(1);
  noFill();
  beginShape();
  for (const p of arr) {
    vertex(p.x, p.y);
  }
  endShape();

  if (recording && frameCounter < MAX_FRAMES) {
    saveCanvas('romi-frame-' + nf(frameCounter, 4), 'png');
    frameCounter++;
    if (frameCounter >= MAX_FRAMES) {
      recording = false;
      print("Recording complete.");
    }
  }
}

 function mousePressed() {
   // pick a new random target within your preferred range
   targetSample = random(SAMPLE_MIN, SAMPLE_MAX);
 }

 function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key === 's') {
    recording = true;
    frameCounter = 0;
  }
}