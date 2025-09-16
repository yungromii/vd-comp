function setup() {
  createCanvas(600, 800);
  background('blue');
  noStroke();
}

function draw() {

  //background(mouseX/2.35);
   noStroke(); 

   

  // ears
  fill('black');
  circle(293,93,136);
 

 
  //face
  fill('#F4E2C2');
  stroke('black');
  strokeWeight('1');
  circle(341,230,170);

   //feet
  fill('yellow');
  circle(169,612,180);
  circle(423,679,180);

   //body
   fill('orange');
  circle(384,443,194); 


  //eyes
  fill('black');
  noStroke(); 
  circle(366,217,44);
  circle(417,205,44);
   circle(201,198,136);

   //eyes
  fill('white');
   
  circle(356,217,30);
  circle(410,205,30);

  //nose
  fill('black');
  
  circle(468,244,66); 

  //mouth
  fill('red');
  circle(334,315,54);  

    

  //buttons
  fill('white');
 
  circle(463,405,45);
  circle(413,424,45);

 
}