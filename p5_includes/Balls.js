/* Speed in m/s */
var v0 = 0.05; 
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

    v0_L  = v0 * abs(a);
    vx0_L = v0_L * sin(a);
    vy0_L = v0_L * cos(a);
    xMax_L = v0_L * v0_L / g ;	
    
}

function getSpeedRight(a){
    
    v0_R  = v0 * abs(a);
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
    translate(-38,-8);
    ellipse(0,0,d_ball);
    pop();
    }
    if(side == "right" ){
    translate(kToXi(wip_dis*M), kToYi(groundY)-tri_height*M);
    push();
    rotate(phi);
    translate(38,-8);
    ellipse(0,0,d_ball);
    pop();
    }
    pop();
  }
