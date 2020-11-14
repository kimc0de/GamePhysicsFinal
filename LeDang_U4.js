/************** Variables Declaration *****************/

/* Canvas */
var Width = 800;                          // canvas width
var Height = 400;                         //canvas height

/* Co-ordinates */ 
var  xi0 = 0.5*Width;                     // intern origin X-position
var  yi0 = 5/6*Height;                    // intern origin Y-position
 
/* Massstabe */
let realLength = 2;                       // length of canvas in m 
let M = Width/realLength;                 // Masstabe canvas width 800px : 2m reality

/* Ground */
let groundY = 0;                          // groundY = rect Y-position
let groundX = -1;                         // groundX = rect X-position
let groundW = 2;                          // width of the ground
let groundH = 0.0625;                     // height of the ground

/* Balls */
let d_ball = 0.032;                       // ball's diameter in m
let r_ball = 0.016;                       // ball's radius in m
var xball = 0                             // center ball X-position
var yball = r_ball;                       // center ball Y-position
var xball_L = -0.68;                      // left ball X-position, used in ballLeftFly()
var yball_L = 0.105;                      // left ball Y-position, used in ballLeftFly()
var xball_R = 0.68;                       // right ball X-position, used in ballLeftFly()
var yball_R = 0.105;                      // right ball Y-position, used in ballLeftFly()
var xL = xball_L;                // left ball initialized X-position, used in drawBallMove()
var yL = yball_L;                // left ball initialized Y-position, used in drawBallMove()
var xR = xball_R;                // right ball initialized X-position, used in drawBallMove()
var yR = yball_R;                // right ball initialized Y-position, used in drawBallMove()
var x0L = -0.68;                          // save start X-position of left ball for method ballLeftFly()
var y0L = 0.105;                          // save start Y-position of left ball for method ballLeftFly()
var x0R = 0.68;                           // save start X-position of right ball for method ballRightFly()
var y0R = 0.105;                          // save start Y-position of right ball for method ballRightFly()

/* Balls status */ 
var ballMove_L = true;                    // state of left ball moving with left Wippe
var ballMove_R = true;                    // state of right ball moving with right Wippe
var ballFly_L = false;                    // state of left ball flying
var ballFly_R = false;                    // state of right ball flying

  
/* Wippe */
let tri_height = 0.05;                    // triangle height in m
let wip_length = 0.25 ;                   // Wippe length in m 
let wip_dis = 0.6                         // distance of each Wippe to kart. origin in m
let redline_dis = 0.4                     // distance of each red line to kart. origin in m
var rightPhi, leftPhi;                    // variables to keep track of Wippe angles changes
var rightPhi0, leftPhi0;                  // initialized values of the Wippe'angles 
var wippeLMove = false;                   // state of left Wippe's movement
var wippeRMove = false;                   // state of right Wippe's movement
var leftAngle, rightAngle;                // save wippe's pressed angle after Wippe is released to calculate ball's speed

/* Button */
let butonX;                                   
let buttonY;
let buttonW;
let buttonH ;
var buttonName ;

/* Bubbles for movement */
let bubbleD = 0.075*M; //bubble diameter
let r = bubbleD/2;

/* Time */
var t = 0;             // Zeit
var t_left  = 0;
var t_right = 0;
var dt;                // Zeitquant - wird auf die Bildwechselrate bezogen
var frmRate;           // Fliesskommadarstellung für Kehrwertbildung notwendig!

/* Gravity*/
var g = 9.81;


function setup() {    
 
  createCanvas(Width, Height);
/****** Button ********/
  buttonX = 360;
  buttonY = 365;
  buttonW = 80;
  buttonH = 30;
  buttonName = "Start";
  
/****** Wippe initialized angle *******/
  angleMode(DEGREES);
  leftPhi = asin(tri_height*M/(M*wip_length/2)); //23.57817848;
  rightPhi = - asin(tri_height*M/(M*wip_length/2)); //-23.57817848;
  leftPhi0 = leftPhi;
  rightPhi0 = rightPhi;

/******* Wippe co-ord **********/
  w1x = kToXi(M*(-wip_dis-sqrt(sq(wip_length/2)-sq(tri_height))));
  w1y = kToYi(tri_height*2*M);
  w2x = kToXi(M*(wip_dis+sqrt(sq(wip_length/2)-sq(tri_height))));
  w2y = kToYi(tri_height*2*M);
  
/******** Time ********/
  frmRate = 60;
  frameRate(frmRate);
  dt = 1.0/frmRate;

} 

function draw() {
  /* Back ground color */
  background(128,252,245);

  /* Button */
  fill(255,153,51);
  rect (buttonX, buttonY, buttonW, buttonH);
  fill(0);
  text(buttonName,buttonX+20,buttonY+20);

  /* Text */
  fill(0,0,0);
  textSize(16);
  text("Kim Ngan Le Dang - 26.10.2020", 280, 30);
  text("Ubung 4", 370, 55);
  text("Treffer 0:0", 365, 100);
  
  /* Ground */
  strokeWeight(1);
  stroke(0);
  fill(245,237,198);
  rect(kToXi(groundX*M), kToYi(groundY*M), groundW*M, groundH*M); 

  
  /* Red lines underground */
  strokeWeight(4);
  stroke(255,0,0);
  line(kToXi((-redline_dis + 0.02)*M), kToYi(groundY)+2, kToXi((-redline_dis-0.02)*M), kToYi(groundY)+2); //left 
  line(kToXi((redline_dis + 0.02)*M), kToYi(groundY)+2, kToXi((redline_dis-0.02)*M), kToYi(groundY)+2);   //right

  /* Wippe */
  strokeWeight(1);
  stroke(0);
  fill(49,96,178); //triangles color
  //triangles
  //left
  triangle(kToXi(-wip_dis*M), kToYi(groundY)-tri_height*M, //top
           kToXi((-wip_dis+0.04)*M), kToYi(groundY), //right
           kToXi((-wip_dis-0.04)*M), kToYi(groundY) ); //left
  //right
  triangle(kToXi(wip_dis*M), kToYi(groundY)-tri_height*M, //top
          kToXi((wip_dis+0.04)*M), kToYi(groundY), //right
          kToXi((wip_dis-0.04)*M), kToYi(groundY) );//left
  
  
  fill(0); //wippe color black
  drawWippe(-wip_dis,tri_height, wip_length, 0.005, leftPhi,"left");
  drawWippe(wip_dis,tri_height, wip_length, 0.005, rightPhi,"right");
 
  /* Balls */
  strokeWeight(1);
  stroke(0);
  fill(255,0,0);                                    //center ball color red
  drawBall(xball, yball, d_ball, d_ball);           // center ball
  
  fill(0,255,0);  
  if(ballMove_L){                                   // left ball is showed and move with the Wippe
    drawBallMove(kToXi(x0L*M),kToYi(y0L*M),d_ball*M, leftPhi,"left"); 
  }
  else if(ballFly_L) {                              // ball is flying
    ballLeftFly(); 
    drawBall(xball_L, yball_L, d_ball, d_ball);     // a different left ball that flies
  }
  else {drawBall(xball_L, yball_L, d_ball, d_ball);} // left ball stops when reaches Xmax, remain stop position
   
  fill(255,255,0); 
  if(ballMove_R){                                   // right ball is showed and moves with Wippe
    drawBallMove(kToXi(x0R*M),kToYi(y0R*M),d_ball*M, rightPhi,"right");
  }
  else if (ballFly_R){                               //ball is flying
    ballRightFly();  
    drawBall(xball_R, yball_R, d_ball, d_ball);      // a different right ball that flies
    }
  else {drawBall(xball_R, yball_R, d_ball, d_ball);} // right ball stops when reaches Xmax, remain stop position

 }





