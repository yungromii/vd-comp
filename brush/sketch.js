let mic, micOn = false, btn;

function preload() {
  brushImg = loadImage('yungromii.png'); // replace 'brush.png' with your actual file name
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  imageMode(CENTER); // so the brush centers under the curso
  mic = new p5.AudioIn();
  mic.start(); // start mic input
  btn = createButton('Mic: OFF');
  btn.position(10, 10);
  btn.mousePressed(toggleMic);
}

function draw() {
  if (mouseIsPressed) {
    let level = micOn ? mic.getLevel() : 0;
    let w = 200 + level * 800; // adjust multiplier to see size change more clearly
    image(brushImg, mouseX, mouseY, w, w);
  }
}

function toggleMic() {
  if (!micOn) {
    getAudioContext().resume();
    mic.start();
    micOn = true;
    btn.html('Mic: ON');
  } else {
    mic.stop();
    micOn = false;
    btn.html('Mic: OFF');
  }
}

function keyPressed() {
  if (key === 's') {
    save('myCanvas.png');
  }
}