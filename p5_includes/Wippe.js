/**This file handle the Wippe movement */

/* draw 2 Wippen */ 
function drawWippe(x,y,w,h,phi,side){
  push();
  angleMode(DEGREES);
  translate(kToXi(x*M),kToYi(y*M));
  rotate(phi);
  rectMode(CENTER);
  rect(0,0, w*M, h*M);

  // small triangles on top of Wippen
  if (side === "left" ){
    //triangle(-35,1,-28,-10,-20,-1);
    triangle(kToXi(-1.0875*M),kToYi(0.8308*M),kToXi(-1.07*M),kToYi(0.8583*M),kToXi(-1.05*M),kToYi(0.8358*M));
  }
  if (side === "right" ){
    //triangle(35,1,28,-10,20,-1);
    triangle(-kToXi(-1.0875*M),-kToYi(0.8308*M),-kToXi(-1.07*M),kToYi(0.8583*M), -kToXi(-1.05*M),kToYi(0.8358*M) );
  }
  pop();
}

/* left Wippe is pressed */
function wippeLeftMove(){
  if (mouseY > kToYi(groundY)-tri_height*2*M && mouseY < kToYi(groundY)){
    wippeLMove = true;
    ballMove_L = true;
    w1y = mouseY;
    leftPhi = asin((iToYk(w1y)/M-tri_height)/(0.5*wip_length));
    
  }
}
/* right Wippe is pressed */
function wippeRightMove(){
  if (mouseY > kToYi(groundY)-tri_height*2*M && mouseY < kToYi(groundY)){
    wippeRMove = true;
    ballMove_R = true;
    w2y = mouseY;
    rightPhi = -asin((iToYk(w2y)/M -tri_height)/(0.5*wip_length)); 
    
  }
}

function releaseWippe(){
                                 //reset time
    dt = 1/frmRate;
    
  if(wippeLMove){
    t_left =0;
    leftAngle = getLeftAngle(leftPhi);      // get the pressed angle for getSpeedLeft()
    leftPhi = leftPhi0;                  // left wippe is released, returns to old position
    ballMove_L =false;                      // left ball stops moving , starts flying
    wippeLMove=false; 
    ballFly_L =true;                      
    getSpeedLeft(leftAngle);                // calculate the start speed of left ball
  }
  
   if (wippeRMove){
    t_right = 0;
    rightAngle = getRightAngle(rightPhi);   // get the pressed angle for getSpeedRight()
    rightPhi = rightPhi0;                // right wippe is released, returns to old position
    ballMove_R=false;                       // right ball stops moving , starts flying
    wippeRMove=false;
    ballFly_R = true;
    getSpeedRight(rightAngle);              // calculate the start speed of right ball
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