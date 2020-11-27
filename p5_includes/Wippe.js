/**This file handle the Wippe movement */

/* Wippe variables*/
let tri_height = 0.05;                    // triangle height in m
let wip_length = 0.25 ;                   // Wippe length in m 
let wip_dis = 0.6                         // distance of each Wippe to kart. origin in m
let redline_dis = 0.4                     // distance of each red line to kart. origin in m
var rightPhi, leftPhi;                    // variables to keep track of Wippe angles changes
var rightPhi0, leftPhi0;                  // initialized values of the Wippe'angles 
var wippeLMove = false;                   // state of left Wippe's movement
var wippeRMove = false;                   // state of right Wippe's movement
var leftAngle, rightAngle;                // save wippe's pressed angle after Wippe is released to calculate ball's speed
var mouseLeftActive, mouseRightActive;    // boolean: true if Wippe hasnt been released or click RESET button, false if Wippe is released & ball flies
let startWippe_Left, startWippe_Right;    // begin points of the Wippe, end positions of horizontal movement
let bottomBorder_Left, bottomBorder_Right;

/* draw 2 Wippen */ 
function drawWippe(x,y,w,h,phi,side){
  push();
  angleMode(DEGREES);
  translate(kXi(x*M),kYi(y*M));
  rotate(phi);
  rectMode(CENTER);
  rect(0,0, w*M, h*M);

  // small triangles on top of Wippen
  if (side === "left" ){
    triangle(kXi(-1.0875*M),kYi(0.6708*M),kXi(-1.07*M),kYi(0.6983*M),kXi(-1.05*M),kYi(0.6658*M));
  }
  if (side === "right" ){
    triangle(-kXi(-1.0875*M),kYi(0.6708*M),-kXi(-1.07*M),kYi(0.6983*M), -kXi(-1.05*M),kYi(0.6658*M) );
  }
  pop();
}

/* left Wippe is pressed */
function wippeLeftMove(){
  if (mouseLeftActive && mouseY > kYi(groundY)-tri_height*2*M && mouseY < kYi(groundY)){
    wippeLMove = true;
    status_left = "init";
    w1y = mouseY;
    leftPhi = asin((iYk(w1y)/M-tri_height)/(0.5*wip_length));
    
  }
}
/* right Wippe is pressed */
function wippeRightMove(){
  if (mouseRightActive && mouseY > kYi(groundY)-tri_height*2*M && mouseY < kYi(groundY)){
    wippeRMove = true;
    status_right = "init";
    w2y = mouseY;
    rightPhi = -asin((iYk(w2y)/M -tri_height)/(0.5*wip_length)); 
    
  }
}

function releaseWippe(){
             
    dt = 1/frmRate;
    
  if(wippeLMove){
    t_left =0;                                //reset time
    leftAngle = getLeftAngle(leftPhi);        // get the pressed angle for getSpeedLeft()
    leftPhi = leftPhi0;                       // left wippe is released, returns to old position
    wippeLMove=false; 
    status_left = "flying";                  
    getSpeedLeft(leftAngle);                  // calculate the start speed of left ball
    mouseLeftActive =false;
  }
  
   if (wippeRMove){
    t_right = 0;                              //reset time
    rightAngle = getRightAngle(rightPhi);     // get the pressed angle for getSpeedRight()
    rightPhi = rightPhi0;                     // right wippe is released, returns to old position
    wippeRMove = false;                         
    status_right = "flying";
    getSpeedRight(rightAngle);                // calculate the start speed of right ball
    mouseRightActive =false;
  }
  
}
/*  how much wippe is moving ? modify the angle so that from top -> bottom is same as ~ 0 -> 45 degree */
function getLeftAngle(angle){
  var a;
  if (angle == 0){
    a = 23.57817848;
  }
  if (angle <0){
    a = 23.57817848 -angle;
  }
  if (angle > 0){
    a = 23.57817848 - angle;
  }
  
  return a;
}

function getRightAngle(angle){
  var a = angle;
  if (angle == 0){
    a = 23.57817848;
  }
  if(angle < 0){
    a = 23.57817848 + angle;
  }
  if (angle > 0){
    a = 23.57817848 + angle;
  }
  return a;
}