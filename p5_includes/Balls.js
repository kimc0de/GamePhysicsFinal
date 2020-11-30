/* Balls */
let d_ball = 0.032; // ball's diameter in m
let r_ball = 0.016; // ball's radius in m
var xball = 0 // center ball X-position
var yball = r_ball; // center ball Y-position
var xball_L = -0.68; // left ball X-position, used in ballLeftFly()
var yball_L = 0.105; // left ball Y-position, used in ballLeftFly()
var xball_R = 0.68; // right ball X-position, used in ballLeftFly()
var yball_R = 0.105; // right ball Y-position, used in ballLeftFly()
var x0L = xball_L; // left ball initialized X-position
var y0L = yball_L; // left ball initialized Y-position
var x0R = xball_R; // right ball initialized X-position
var y0R = yball_R; // right ball initialized Y-position
var x0_left = xball_L;
var y0_left = yball_L;
var x0_right = xball_R;
var y0_right = yball_R;

/* Balls status */
var status_left, status_right;
var onLeftWippe = false;
var onRightWippe = false;

/* Speed in m/s */
var v0max = 3;
var v0min = 2.5;
var v0_L,v0_R;
var vx0_L, vy0_L;
var vx0_R, vy0_R;
var vy_L, vy_R, vx_L, vx_R;
var s0;								// start positions on Wippe
var s_left, s_right;				// current position of the balls 
var v_left, v_right;                // speed when balls on the Wippe
var v0s_left, v0s_right;            // start speed to roll on Wippe

/* Get the start speed of left ball, parameter a is the pressed angle */
function getSpeedLeft(a) {
    v0_L = v0max * a / getLeftAngle(-leftPhi0) ; //speed prop. with angle
    if (v0_L < v0min) {
        v0_L = v0min;
    }
    vx0_L = v0_L * sin(a);
    vy0_L = v0_L * cos(a);	
    xball_L = x0L;
    yball_L = y0L;
    vx_L = vx0_L;
    vy_L = vy0_L;
}

function getSpeedRight(a) {
    v0_R = v0max * a / getRightAngle(-rightPhi0) ; //speed prop. with angle
    if (v0_R < v0min) {
        v0_R = v0min;
    }
    vx0_R = v0_R * sin(a);
    vy0_R = v0_R * cos(a);
    xball_R = x0R;
    yball_R = y0R;
    vx_R = vx0_R;
    vy_R= vy0_R;

}

/*************** Left Ball Movement ****************/
function leftBall_Fly() {
    vy_L = vy_L - g * dt;
    yball_L = yball_L + vy_L*dt;
    xball_L = xball_L + vx_L*dt;
    if (yball_L <= r_ball) {
        status_left = "onGround"; 
    } 
}

function leftBall_OnGround() {
    vy_L = vy_L - g * dt;
    yball_L = r_ball;
    if (xball_L > bottomBorder_Left && xball_L < bottomBorder_Right){
        xball_L = xball_L + vx_L*dt;
    }
   
    if (xball_L <= bottomBorder_Left) {
        v_left = vx_L;
        s_left = s0;
        status_left = "onLeftWippe";
    }
    if (xball_L >= bottomBorder_Right) {
        v_left = vx_L;
        s_left = s0;
        status_left = "onRightWippe";
       
    }
}

function leftBall_OnLeftWippe() {
    v_left = v_left + g * sin(leftPhi0)*dt;
    s_left = s_left - v_left* dt;
    
    if (s_left < s0) { 
        xball_L = bottomBorder_Left + r_ball; //push the ball to the ground
        status_left = "onGround";
        vx_L = - vx_L; //change vx direction
    }
}

function leftBall_OnRightWippe() {
    v_left = v_left - g * sin(leftPhi0)*dt;
    s_left = s_left + v_left* dt;
    
    if (s_left < s0) { 
        xball_L = bottomBorder_Right - r_ball; //push the ball to the ground
        status_left = "onGround";
        vx_L = - vx_L; //change vx direction
    }
}

/*************** Right Ball Movement ****************/

function rightBall_Fly() {
    vy_R = vy_R - g * dt;
    yball_R = yball_R + vy_R*dt;
    xball_R = xball_R - vx_R*dt;
    if (yball_R <= r_ball) {
        status_right = "onGround"; 
    } 
}

function rightBall_OnGround() {
    vy_R = vy_R - g * dt;
    yball_R = r_ball;

    if (xball_R > bottomBorder_Left && xball_R < bottomBorder_Right){
        xball_R = xball_R - vx_R*dt;
    }
    if (xball_R <= bottomBorder_Left) {
        v_right = vx_R;
        s_right = s0;
        status_right = "onLeftWippe";
    }
    if (xball_R >= bottomBorder_Right) {
        v_right = vx_R;
        s_right = s0;
        status_right = "onRightWippe";
    }
}

function rightBall_OnLeftWippe(){
    v_right = v_right - g * sin(leftPhi0)*dt;
    s_right = s_right + v_right * dt;

    if (s_right < s0) { 
        xball_R = bottomBorder_Left + r_ball; //push the ball to the ground
        status_right = "onGround";
        vx_R = - vx_R; //change vx direction
    }
}

function rightBall_OnRightWippe(){
    v_right = v_right + g * sin(leftPhi0)*dt;
    s_right = s_right - v_right * dt;
    
    if (s_right < s0) { 
        xball_R = bottomBorder_Right - r_ball; //push the ball to the ground
        status_right = "onGround";
        vx_R = - vx_R; //change vx direction
    }
  
}


/*********************** Drawing functions****************************/


/* Draw the green, yellow balls when they're initialized and move with their Wippe*/
function ballMoveWithWippe(x, y, d_ball, phi, side) {
    push();
    angleMode(DEGREES);
    if (side == "left") {
        translate(kXi(-wip_dis * M), kYi(groundY) - tri_height * M);
        push();
        rotate(phi);
        translate(-30, -6);
        ellipse(0, 0, d_ball);
        pop();
    }
    if (side == "right") {
        translate(kXi(wip_dis * M), kYi(groundY) - tri_height * M);
        push();
        rotate(phi);
        translate(30, -6);
        ellipse(0, 0, d_ball);
        pop();
    }
    pop();
}
