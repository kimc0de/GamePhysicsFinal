/* This file handles constant stuff such as canvas, text, ground.  */

/* Canvas */
var Width = 600; // canvas width
var Height = 300; //canvas height

/* Co-ordinates */
var xi0 = 0.5 * Width; // intern origin X-position
var yi0 = 2 / 3 * Height; // intern origin Y-position

/* Massstabe */
var realLength = 2; // length of canvas in m 
var M = Width / realLength; // Masstabe canvas width 800px : 2m reality

/* Bubbles for ball movement */
var r_bubble = 0.075 * M / 2;

/* Time */
var dt; // Zeitquant - wird auf die Bildwechselrate bezogen
var frmRate; // Fliesskommadarstellung für Kehrwertbildung notwendig!

/* Ground */
var groundY = 0; // groundY = rect Y-position
var groundX = -1; // groundX = rect X-position
var groundW = 2; // width of the ground
var groundH = 0.0625; // height of the ground

/**Scores */
var leftScore , rightScore;

function drawConstants() {

  /* Text */
  fill(0, 0, 0);
  textSize(12);
  text("Ball Game - Kim Ngan Le Dang", 220, 30);
  //scores
  text("Treffer "+ leftScore + " : " + rightScore, 270, 55);

  /* Ground */
  strokeWeight(1);
  stroke(0);
  fill(0, 0, 0);
  rect(kXi(groundX * M), kYi(groundY * M), groundW * M, groundH * M);

  /* Lines underground */
  strokeWeight(4);
  stroke(0, 255, 0);
  line(kXi((-redline_dis + 0.02) * M), kYi(groundY) + 2, kXi((-redline_dis - 0.02) * M), kYi(groundY) + 2); //left 
  stroke(255, 255, 0);
  line(kXi((redline_dis + 0.02) * M), kYi(groundY) + 2, kXi((redline_dis - 0.02) * M), kYi(groundY) + 2); //right

  /* Wippe */
  strokeWeight(1);
  stroke(0);
  fill(49, 96, 178); //triangles color
  //triangles
  //left
  triangle(kXi(-wip_dis * M), kYi(groundY) - tri_height * M, //top
    kXi((-wip_dis + 0.04) * M), kYi(groundY), //right
    kXi((-wip_dis - 0.04) * M), kYi(groundY)); //left
  //right
  triangle(kXi(wip_dis * M), kYi(groundY) - tri_height * M, //top
    kXi((wip_dis + 0.04) * M), kYi(groundY), //right
    kXi((wip_dis - 0.04) * M), kYi(groundY)); //left

  //Which turn 
  textSize(15);
  if (leftTurn){
    fill(0, 255, 0);
    text("Left", 170, 55);
  }else if (rightTurn){
    fill(255, 255, 0);
    text("Right", 370, 55);
  }
}