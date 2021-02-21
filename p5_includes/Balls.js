/* This file handles Balls setup, balls movement*/

/************************** Variables Declaration ****************************/

let d_ball = 0.05; // ball's diameter in m
let r_ball = 0.025; // ball's radius in m

/* Center ball */ 
var redBall_x0 = 0      // init X-position
var redBall_y0 = 0.025; // init Y-position
var redBall_vx0 = 0.0;  // init X-speed
var redBall_vy0 = 0.0;  // init Y-speed
var redBall_x, redBall_y, redBall_vx, redBall_vy;
/* Left ball */
var x0_left = -0.68;
var y0_left = 0.205;
var xball_L, yball_L ;   // X-position, Y-position during movement 
var x0L, y0L ;       // initialized X-position, initialized Y-position

/* Right ball*/
var x0_right = 0.68;
var y0_right = 0.205;
var xball_R, yball_R ;     // X-position, Y-position during movement
var x0R , y0R;      // initialized X-position, initialized Y-position
    
/* Balls weight in kg */
var m = 0.025; 
/* Balls status */
var status_left, status_right;
var onLeftWippe = false;
var onRightWippe = false;
/* Gravity*/
var g = 9.81;
/** Reibungen */
var frictionConst = 0.2;
var cW = 0.45;
var pLuft = 1.3 // Luftdichte kg/m^3
var A = Math.PI * r_ball * r_ball;
var r = cW * pLuft * A / 2;
/* Speed in m/s */
var v0max = 3.0;
var v0min = 1.5;
var v0_L, v0_R;
var vx0_L, vy0_L;
var vx0_R, vy0_R;
var vy_L, vy_R, vx_L, vx_R;
var s0; // start positions on Wippe
var s_left, s_right; // current position of the balls 
var v_left, v_right; // speed when balls on the Wippe
var v0s_left, v0s_right; // start speed to roll on Wippe
var prevL, prevR;  //status before collision
var leftTurn, rightTurn;


/****************************** Calculation **********************************/

/* Set up play balls */
function setupBalls() {
    status_left = "init";
    status_right = "init";
    v_left = 0.0;
    v_right = 0.0;
    s_left = 0.0;
    s_right = 0.0;
    s0 = r_ball * sin(rightPhi0 / 2);
    redBall_x = redBall_x0;
    redBall_y = redBall_y0;
    x0R = x0_right;
    y0R = y0_right;
    x0L = x0_left;
    y0L = y0_left;
}

/* Get the start speed of play balls, parameter a is the pressed angle */
function getSpeedLeft(a) {

    v0_L = v0max * a / getLeftAngle(-leftPhi0); //speed prop. with angle

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
    v0_R = v0max * a / getRightAngle(-rightPhi0); //speed prop. with angle
    
    if (v0_R < v0min) {
        v0_R = v0min;
    }
    vx0_R = v0_R * sin(a);
    vy0_R = v0_R * cos(a);
    xball_R = x0R;
    yball_R = y0R;
    vx_R = -vx0_R;
    vy_R = vy0_R;
}

/*************** Left Ball Movement ****************/
function leftBall_Fly() {
    vy_L = vy_L - (g + (r / m) * vy_L * Math.sqrt(vx_L * vx_L + vy_L * vy_L)) * dt;
    vx_L = vx_L - (r / m) * vx_L * Math.sqrt(vx_L * vx_L + vy_L * vy_L) * dt;

    yball_L = yball_L + vy_L * dt;
    xball_L = xball_L + vx_L * dt;
    
     //check collision
     let dx = redBall_x - xball_L;
     let dy = redBall_y -  yball_L;
     let dvx = redBall_vx - vx_L;
     let dvy = redBall_vy - vy_L ; 
 
     let t_ = abs((-sqrt((sq(dvx) + sq(dvy))*sq(d_ball) - sq(dx*dvy - dy*dvx)) - (dx*dvx + dy*dvy))/(sq(dvx) + sq(dvy))); 

     if (t_ <= dt && !COLLISION){
         COLLISION = true;
         prevL = "flying";
         status_left = "collision";
      }else{					
        COLLISION = false;
        status_left = "flying";
    }

     if (yball_L <= r_ball) {
        status_left = "onGround";
    }
}

function leftBall_OnGround() {
    if (vx_L < 0) {
        vx_L = vx_L + frictionConst * g * dt;
    } else {
        vx_L = vx_L - frictionConst * g * dt;
    }
    yball_L = r_ball;
    if (xball_L > bottomBorder_Left && xball_L < bottomBorder_Right) {
        xball_L = xball_L + vx_L * dt;
    }
    //check collision suggestion from Bartho Berresheim
    let dx = redBall_x - xball_L;
    let dy = redBall_y -  yball_L;
    let dvx = redBall_vx - vx_L;
    let dvy = redBall_vy - vy_L ; 

    let t_ = abs((-sqrt((sq(dvx) + sq(dvy))*sq(d_ball) - sq(dx*dvy - dy*dvx)) - (dx*dvx + dy*dvy))/(sq(dvx) + sq(dvy))); 
    
    if (t_ <= dt && !COLLISION){
        COLLISION = true;
        prevL = "onGround";
        status_left = "collision";
    }else{					
        COLLISION = false;
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
    v_left = v_left - (g * cos(leftPhi0) * frictionConst - g * sin(leftPhi0)) * dt;
    s_left = s_left - v_left * dt;

    if (s_left < s0) {
        xball_L = bottomBorder_Left + r_ball; //push the ball to the ground
        status_left = "onGround";
        vx_L = -vx_L; //change vx direction
    }
}   

function leftBall_OnRightWippe() {
    v_left = v_left + (g * cos(leftPhi0) * frictionConst - g * sin(-rightPhi0)) * dt;
    s_left = s_left + v_left * dt;
   
    if (s_left < s0) {
        xball_L = bottomBorder_Right - r_ball; //push the ball to the ground
        status_left = "onGround";
        vx_L = -vx_L; //change vx direction
    }
}
function leftCollision(){
    if (COLLISION){
    beta = atan2(yball_L - redBall_y, xball_L - redBall_x);
    phi = radians(beta) - HALF_PI;

    result = rotateVector(vx_L, vy_L, phi);
        v1T = result[0];
        v1Z = result[1];
    result = rotateVector(redBall_vx0, redBall_vy0, phi);
        v2T = result[0];
        v2Z = result[1];
    
    v1Z_= ((m1-m2)*v1Z+2*m2*v2Z)/(m1+m2);    
    v1T_ = v1T;                            

    v2Z_= ((m2-m1)*v2Z+2*m1*v1Z)/(m1+m2);       
    v2T_ = v2T;                           

    result = rotateVector(v1T_, v1Z_, -phi);
        v1x_ = result[0];
        v1y_ = result[1];
    result = rotateVector(v2T_, v2Z_, -phi);
        v2x_ = result[0];
        v2y_ = result[1];
    v1y_ = v1y_ - v2y_;
    v2y_ = 0;

    // Nach dem Stoß   
    redBall_vx = v2x_;
    redBall_vy = v2y_;
    vx_L = v1x_;
    vy_L = v1y_;
    
    COLLISION = false;
}
   
    redBall_y += redBall_vy * dt;
    
    if (redBall_y <= r_ball){
        redBall_y = r_ball;
    }  
    if(redBall_vx > 0){
        redBall_vx -= frictionConst*g*dt;
        if(redBall_vx < 0)
            redBall_vx = 0;
    }
    else{
        redBall_vx += frictionConst*g*dt;
        if(redBall_vx > 0){
            redBall_vx = 0;
        }
    }
    redBall_x += redBall_vx * dt;
    if(prevL =="flying"){
        vy_L = vy_L - (g + (r / m) * vy_L * Math.sqrt(vx_L * vx_L + vy_L * vy_L)) * dt;
        vx_L = vx_L - (r / m) * vx_L * Math.sqrt(vx_L * vx_L + vy_L * vy_L) * dt;
    
        yball_L = yball_L + vy_L * dt;
        xball_L = xball_L - vx_L * dt;
        if (yball_L <= r_ball) {
            yball_L = r_ball;
            if(xball_L> 1 || xball_L < -1){
                status_left = "init";
            }
            if (vx_L < 0) {
                vx_L = vx_L + frictionConst * g * dt;
            } else {
                vx_L = vx_L - frictionConst * g * dt;
            }
        }
    }
}

/*************** Right Ball Movement ****************/

function rightBall_Fly() {
    vy_R = vy_R - (g + (r / m) * vy_R * Math.sqrt(vx_R * vx_R + vy_R * vy_R)) * dt;
    vx_R = vx_R - (r / m) * vx_R * Math.sqrt(vx_R * vx_R + vy_R * vy_R) * dt;

    yball_R = yball_R + vy_R * dt;
    xball_R = xball_R + vx_R * dt;

     //check collision
     let dx = redBall_x - xball_R ;
     let dy = redBall_y - yball_R ;
     let dvx = redBall_vx - vx_R;
     let dvy = redBall_vy - vy_R; 
 
     let t_ = abs((-sqrt((sq(dvx) + sq(dvy))*sq(d_ball) - sq(dx*dvy - dy*dvx)) - (dx*dvx + dy*dvy))/(sq(dvx) + sq(dvy))); 
 
     if (t_ < dt && !COLLISION){
         COLLISION = true;
         prevR = "flying";
         status_right = "collision";
         
     }else{					
         COLLISION = false;
     }

    if (yball_R <= r_ball) {
        status_right = "onGround";
    }
}

function rightBall_OnGround() {
    if (vx_R < 0) {
        vx_R = vx_R + frictionConst * g * dt;
    } else {
        vx_R = vx_R - frictionConst * g * dt;
    }
    yball_R = r_ball;

    if (xball_R > bottomBorder_Left && xball_R < bottomBorder_Right) {
        xball_R = xball_R + vx_R * dt;
    }
    //check collision
    let dx = redBall_x - xball_R ;
    let dy = redBall_y - yball_R;
    let dvx = redBall_vx - vx_R;
    let dvy = redBall_vy - vy_R; 

    let t_ = abs((-sqrt((sq(dvx) + sq(dvy))*sq(d_ball) - sq(dx*dvy - dy*dvx)) - (dx*dvx + dy*dvy))/(sq(dvx) + sq(dvy))); 

    if (t_ >= dt && !COLLISION){
        COLLISION = true;
        status_right = "collision";
    }else{					
        COLLISION = false;
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

function rightBall_OnLeftWippe() {
    v_right = v_right - (g * cos(leftPhi0) * frictionConst - g * sin(leftPhi0)) * dt;
    s_right = s_right - v_right * dt;
    
    if (s_right < s0) {
        xball_R = bottomBorder_Left + r_ball; //push the ball to the ground
        status_right = "onGround";
        vx_R = -vx_R; //change vx direction
    }
}

function rightBall_OnRightWippe() {
    v_right = v_right - (g * cos(-rightPhi0) * frictionConst - g * sin(-rightPhi0)) * dt;
    s_right = s_right - v_right * dt;

    if (s_right < s0) {
        xball_R = bottomBorder_Right - r_ball; //push the ball to the ground
        status_right = "onGround";
        vx_R = -vx_R; //change vx direction
    }
}
function rightCollision(){
    if (COLLISION){
    beta = atan2(yball_R -redBall_y , xball_R - redBall_x);
    phi = radians(beta) - HALF_PI;

    result = rotateVector(vx_R, vy_R, phi);
        v1T = result[0];
        v1Z = result[1];
    result = rotateVector(redBall_vx0, redBall_vy0, phi);
        v2T = result[0];
        v2Z = result[1];
    
    v1Z_= ((m1-m2)*v1Z+2*m2*v2Z)/(m1+m2);    
    v1T_ = v1T;                            

    v2Z_= ((m2-m1)*v2Z+2*m1*v1Z)/(m1+m2);       
    v2T_ = v2T;                           

    result = rotateVector(v1T_, v1Z_, -phi);
        v1x_ = result[0];
        v1y_ = result[1];
    result = rotateVector(v2T_, v2Z_, -phi);
        v2x_ = result[0];
        v2y_ = result[1];
    v1y_ = v1y_ - v2y_;
    v2y_ = 0;

    // Nach dem Stoß   
    redBall_vx = v2x_;
    redBall_vy = v2y_;
    vx_R = v1x_;
    vy_R = v1y_;
    
    COLLISION = false;
}
    
    redBall_y += redBall_vy * dt;
    
    if (redBall_y <= r_ball){
        redBall_y = r_ball;
    }  
    if(redBall_vx > 0){
        redBall_vx -= frictionConst*g*dt;
        if(redBall_vx < 0)
            redBall_vx = 0;
    }
    else{
        redBall_vx += frictionConst*g*dt;
        if(redBall_vx > 0){
            redBall_vx = 0;
        }
    }
    redBall_x += redBall_vx * dt;
    if(prevR == "flying"){
        vy_R = vy_R - (g + (r / m) * vy_R * Math.sqrt(vx_R * vx_R + vy_R * vy_R)) * dt;
        vx_R = vx_R - (r / m) * vx_R * Math.sqrt(vx_R * vx_R + vy_R * vy_R) * dt;
    
        yball_R = yball_R + vy_R * dt;
        xball_R = xball_R - vx_R * dt;

        if (yball_R <= r_ball) {
            yball_R = r_ball;
            if(xball_R > 1 || xball_R < -1){
                status_right = "init";
            }
            if (vx_R < 0) {
                vx_R = vx_R + frictionConst * g * dt;
            } else {
                vx_R = vx_R - frictionConst * g * dt;
            }
        }
    }
}

/*********************** Drawing functions ****************************/

/* Draw the green, yellow balls when they're initialized and move with their Wippe*/
function ballMoveWithWippe(x, y, d_ball, phi, side) {
    push();
    angleMode(DEGREES);
    if (side == "left") {
        translate(kXi(-wip_dis * M), kYi(groundY) - tri_height * M);
        push();
        rotate(phi);
        translate(-80, -20);
        ellipse(0, 0, d_ball);
        pop();
    }
    if (side == "right") {
        translate(kXi(wip_dis * M), kYi(groundY) - tri_height * M);
        push();
        rotate(phi);
        translate(80, -20);
        ellipse(0, 0, d_ball);
        pop();
    }
    pop();
}

function checkScore(){
    if( (leftTurn || rightTurn) & redBall_x >= redline_dis-0.02){
        leftScore += 1;
        redBall_x = redBall_x0;
        redBall_y = redBall_y0;
        status_left = "init";
        status_right = "init";
    }
    if ((leftTurn || rightTurn) & redBall_x <= -redline_dis+0.02){
        rightScore += 1;
        redBall_x = redBall_x0;
        redBall_y = redBall_y0;
        status_right = "init";
        status_left = "init";
    }
}