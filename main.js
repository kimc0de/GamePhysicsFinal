function setup() {

    createCanvas(Width, Height);
    
    setupButtons();
    setupWippe();
    setupBalls();

    /******** Time ********/
    frmRate = 60;
    frameRate(frmRate);
    dt = 1 / frmRate;
}

function draw() {
  
    background(128, 252, 245);
    drawButtons();
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

    dt = 1 / frmRate;
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
