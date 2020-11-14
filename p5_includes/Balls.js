/* Balls */
let d_ball = 0.032;                       // ball's diameter in m
let r_ball = 0.016;                       // ball's radius in m
var xball = 0                             // center ball X-position
var yball = r_ball;                       // center ball Y-position
var xball_L = -0.68;                      // left ball X-position, used in ballLeftFly()
var yball_L = 0.105;                      // left ball Y-position, used in ballLeftFly()
var xball_R = 0.68;                       // right ball X-position, used in ballLeftFly()
var yball_R = 0.105;                      // right ball Y-position, used in ballLeftFly()
var x0L = xball_L;                        // left ball initialized X-position
var y0L = yball_L;                        // left ball initialized Y-position
var x0R = xball_R;                        // right ball initialized X-position
var y0R = yball_R;                        // right ball initialized Y-position

/* Balls status */ 
var ballMove_L = true;                    // state of left ball moving with left Wippe
var ballMove_R = true;                    // state of right ball moving with right Wippe
var ballFly_L = false;                    // state of left ball flying
var ballFly_R = false;                    // state of right ball flying

/* Speed in m/s */
var v0 = 1; 
var v0_L ;
var v0_R ;
var vx0_L;
var vy0_L;
var vx0_R;
var vy0_R;
/* limited X-position of ball's movements */
var xMax_L;
var xMax_R;

/* Draw the green, yellow balls when they fly */
function drawBall (x,y,w,h){
    ellipse(kToXi(x*M), kToYi(y*M),w*M, h*M);
}
/* Get the start speed of left ball, parameter a is the pressed angle */
function getSpeedLeft(a){

    v0_L  = v0 * a / leftPhi0;
    vx0_L = v0_L * sin(a);
    vy0_L = v0_L * cos(a);
    xMax_L = v0_L * v0_L / g ;	
    
}

function getSpeedRight(a){
    
    v0_R  = v0 * a / (-rightPhi0);
    vx0_R = v0_R * sin(a);
    vy0_R = v0_R * cos(a);
    xMax_R = v0_R * v0_R / g ;
    
}

/* calculate right ball's position when it flies after right Wippe is released */
function ballRightFly() {
    
    yball_R = -g * t_right * t_right / 2 + vy0_R * t_right + y0R;
    xball_R = x0R - vx0_R * t_right;

    if (yball_R <= r_ball) {
        yball_R = r_ball;
    } //land on the ground y= constant
    if (xball_R <= - xMax_R) {
        dt = 0;
        ballFly_R= false;
        
    } 
    else {
        t_right = t_right + dt;
    }

}
/* calculate left ball's position when it flies after left Wippe is released */
function ballLeftFly() {
    
    yball_L = -g * t_left * t_left / 2 + vy0_L * t_left + y0L;
    xball_L = x0L + vx0_L * t_left;

    if (yball_L <= r_ball) {
        yball_L = r_ball;
    } //land on the ground y= constant
    if (xball_L >= xMax_L) {
        dt = 0;
        ballFly_L= false;
       
    } 
    else {
        t_left = t_left + dt;
        
    }
}
/* Draw the green, yellow balls when they're initialized and move with their Wippe*/
function drawBallMove(x,y,d_ball,phi, side){
    push();
    angleMode(DEGREES);
    if(side == "left" ){
    translate(kToXi(-wip_dis*M), kToYi(groundY)-tri_height*M);
    push();
    rotate(phi);
    translate(-30,-6);
    ellipse(0,0,d_ball);
    pop();
    }
    if(side == "right" ){
    translate(kToXi(wip_dis*M), kToYi(groundY)-tri_height*M);
    push();
    rotate(phi);
    translate(30,-6);
    ellipse(0,0,d_ball);
    pop();
    }
    pop();
  }
