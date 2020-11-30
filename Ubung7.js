/************** Variables Declaration *****************/

/* Canvas */
var Width = 600; // canvas width
var Height = 300; //canvas height

/* Co-ordinates */
var xi0 = 0.5 * Width; // intern origin X-position
var yi0 = 2 / 3 * Height; // intern origin Y-position

/* Massstabe */
let realLength = 2; // length of canvas in m 
let M = Width / realLength; // Masstabe canvas width 800px : 2m reality

/* Ground */
let groundY = 0; // groundY = rect Y-position
let groundX = -1; // groundX = rect X-position
let groundW = 2; // width of the ground
let groundH = 0.0625; // height of the ground

/* Bubbles for movement */
let bubbleD = 0.075 * M; //bubble diameter
let r = bubbleD / 2;

/* Time */
var dt; // Zeitquant - wird auf die Bildwechselrate bezogen
var frmRate; // Fliesskommadarstellung für Kehrwertbildung notwendig!

/* Gravity*/
var g = 9.81;

function setup() {

  createCanvas(Width, Height);
  /****** Button ********/
  buttonX = 260;
  buttonY = 250;
  buttonW = 80;
  buttonH = 30;
  buttonColor = '#77FF33';
  buttonName = "START";
  resetButton = new Button(buttonX, buttonY)

  /****** Wippe initialized angle *******/
  angleMode(DEGREES);
  leftPhi = asin(tri_height * M / (M * wip_length / 2)); //23.57817848;
  rightPhi = -asin(tri_height * M / (M * wip_length / 2)); //-23.57817848;
  leftPhi0 = leftPhi;
  rightPhi0 = rightPhi;
  mouseLeftActive = true;
  mouseRightActive = true;

  /******* Wippe co-ord **********/
  w1x = kXi(M * (-wip_dis - sqrt(sq(wip_length / 2) - sq(tri_height))));
  w1y = kYi(tri_height * 2 * M);
  w2x = kXi(M * (wip_dis + sqrt(sq(wip_length / 2) - sq(tri_height))));
  w2y = kYi(tri_height * 2 * M);

  startWippe_Left = -wip_dis + sqrt(sq(wip_length / 2) - sq(tri_height));
  startWippe_Right = wip_dis - sqrt(sq(wip_length / 2) - sq(tri_height));
  bottomBorder_Left = startWippe_Left + r_ball * sin(leftPhi0);
  bottomBorder_Right = -bottomBorder_Left;

  /******** Time ********/
  frmRate = 60;
  frameRate(frmRate);
  dt = 1 / frmRate;

  /********** Ball Status *******/
  status_left = "init";
  status_right = "init";
  v_left = 0.0;
  v_right = 0.0;
  s_left = 0.0;
  s_right = 0.0;
  s0 = r_ball * sin(rightPhi0 / 2);

}

function draw() {
  /* Back ground color */
  background(128, 252, 245);

  /* Button */
  resetButton.drawButton(buttonColor, buttonName);

  setupConstants();

  fill(0); 
  drawWippe(-wip_dis, tri_height, wip_length, 0.005, leftPhi, "left");
  drawWippe(wip_dis, tri_height, wip_length, 0.005, rightPhi, "right");

  /******************* Preparing Calculation ******************/

  if (START) { // always click START before playing, else balls will start flying from a wrong position

    status_left = "init";
    mouseLeftActive = true;
    x0L = x0_left;
    y0L = y0_left;

    status_right = "init";
    mouseRightActive = true;
    x0R = x0_right;
    y0R = y0_right;

    dt = 0.2 / frmRate;
    START = false;
  }

  /************************* Left Ball ***********************/
  fill(0, 255, 0);
  switch (status_left) {
    case "init": //ball on Wippe
        ballMoveWithWippe(kXi(x0L * M), kYi(y0L * M), d_ball * M, leftPhi, "left");
        break;
    case "flying": //ball flies
        leftBall_Fly();
        ellipse(kXi(xball_L*M), kYi(yball_L*M), d_ball*M, d_ball*M);
        break;
    case "onGround": // roll on the ground
        leftBall_OnGround();
        ellipse(kXi(xball_L*M), kYi(yball_L*M), d_ball*M, d_ball*M);
        break;
    case "onLeftWippe":
        leftBall_OnLeftWippe();
        push();
        translate(xi0 + startWippe_Left * M, yi0);
        push();
        rotate(leftPhi0);
        scale(1, -1);
        ellipse(-s_left * M, r_ball * M, d_ball * M, d_ball * M);
        pop();
        pop();
        break;
    case "onRightWippe":
        leftBall_OnRightWippe();
        push();
        translate(xi0 + startWippe_Right * M, yi0);
        push();
        rotate(rightPhi0);
        ellipse(s_left * M, -r_ball * M, d_ball * M, d_ball * M);
        pop();
        pop();
        break;
  }

  /************************* Right Ball ***********************/
  fill(255, 255, 0);
  switch (status_right) {
    case "init": // right ball is showed and moves with Wippe
        ballMoveWithWippe(kXi(x0R * M), kYi(y0R * M), d_ball * M, rightPhi, "right");
        break;
    case "flying": // ball is flying
        rightBall_Fly();
        ellipse(kXi(xball_R*M), kYi(yball_R*M), d_ball*M, d_ball*M);
        break;
    case "onGround": // ball landed on floor, keeps rolling
        rightBall_OnGround();
        ellipse(kXi(xball_R*M), kYi(yball_R*M), d_ball*M, d_ball*M);
        break;
    case "onLeftWippe":
        rightBall_OnLeftWippe();
        push();
        translate(xi0 + startWippe_Left * M, yi0);
        push();
        rotate(leftPhi0);
        scale(1, -1);
        ellipse(-s_right * M, r_ball * M, d_ball * M, d_ball * M);
        pop();
        pop();
        break;
    case "onRightWippe":
        rightBall_OnRightWippe();
        push();
        translate(xi0 + startWippe_Right * M, yi0);
        push();
        rotate(rightPhi0);
        ellipse(s_right * M, -r_ball * M, d_ball * M, d_ball * M);
        pop();
        pop();
        break;
  }
}
