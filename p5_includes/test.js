/** This file is for testing collision */

/** Test buttons */
var modeX, modeY, modeW, modeH, modeColor, modeName; //Mode button for testing
var resetX, resetY, resetW, resetH, resetColor, resetName; // Reset button for testing
var startX, startY, startW, startH, startColor, startName; // Start button for testing
var startButton, modeButton, resetButton, startTestButton;
var inputX, inputY, inputVX, inputVY;

var TEST = false;
var COLLISION = false;

/** Test ball position, speed variables */
var testBall_vx, testBall_vy, testBall_vx0, testBall_vy0;
var testBall_x0, testBall_y0, testBall_x, testBall_y;
var testBallVisible = false;
var testball_status;

var beta = 0;          // Stoßwinkel
var phi;   
var result;

// 1 is test ball, 2 is red ball
var v1Z, v1Z_, v2Z, v2Z_;   // Zentralgeschwindigkeit
var v1T, v1T_, v2T, v2T_;   // Tangentialgeschwindigkeit
var v1_, v2_;               // Geschwindigkeiten nach dem Stoß
var v2x_, v1x_;
var v2y_, v1y_;
 
var m1 = m;  //all balls have the same weight
var m2 = m;
var touchedGround1 = false;
var touchedGround2 = false;


/** Input fields for testing */
function setupInput() {
    /******** Input in meter ********/
    inputX = createInput('-0.16');
    inputX.position(35, 35);
    inputX.size(35);
    inputY = createInput('0.03');
    inputY.position(35, 55);
    inputY.size(35);
    inputVX = createInput('0.2');
    inputVX.position(35, 75);
    inputVX.size(35);
    inputVY = createInput('0');
    inputVY.position(35, 95);
    inputVY.size(35);
}

function setUpTestButtons(){
     /****** Testing buttons & text fields ********/
  modeX = 60;
  modeY = 250;
  modeW = 80;
  modeH = 30;
  modeColor = '#16c79a';
  modeName = "TEST";
  modeButton = new Button(modeX, modeY, modeW, modeH);

  resetX = 160;
  resetY = 250;
  resetW = 80;
  resetH = 30;
  resetColor = '#16c79a';
  resetName = "RESET";
  resetButton = new Button(resetX, resetY, resetW, resetH);

  startX = 260;
  startY = 250;
  startW = 80;
  startH = 30;
  startColor = '#16c79a';
  startName = "START";
  startTestButton = new Button(startX, startY, startW, startH);
}

function drawTestButtons(){
    modeButton.drawButton(modeColor, modeName);
    resetButton.drawButton(resetColor, resetName);
    startTestButton.drawButton(startColor, startName);
}

/**
 * Test mode button is clicked. Test mode on. Test ball appears.
 */
function modeButtonIsClicked() {
    if (modeName === "TEST") { //test mode on
      TEST = true;
      testball_status = "init";
      testBallVisible = true;
      setupInput();
      placeTestBall();
      modeColor = '#FF5533';
      modeName = "OFF";
      mouseLeftActive = false; //disable Wippe movement
      mouseRightActive = false;
    } 
    else if (modeName === "OFF"){ //turn off test mode
      TEST = false;
      testball_status = "init";
      testBallVisible = false;
      mouseLeftActive = true;
      mouseRightActive = true;
      modeColor = '#16C79A';
      modeName = "TEST";
      inputX.hide();
      inputY.hide();
      inputVX.hide();
      inputVY.hide();
      redBall_x = redBall_x0;
      redBall_y = redBall_y0;
      redBall_vx = redBall_vy0;
      redBall_vy = redBall_vy0;
    }
  }

  /**
   * resetButton for testing
   * Clickable only when Test mode is ON
   * Reset is clicked, test ball is positioned accordingly.
   */
  function resetButtonIsClicked() {
    resetColor = '#FF5533';
    testball_status = "init";
    placeTestBall();
    setTimeout(() => {
      resetColor = '#16C79A';
    }, 100);
    COLLISION = false;
  }

  /**
   * startTestButton for testing
   * Clickable only when Test mode is On
   * Test ball moves
   */
  function startTestIsClicked(){
    startColor = '#FF5533';
    TESTSTART = true;
    testball_status = "move";
    setTimeout(() => {
      startColor = '#16C79A';
    }, 100);
    COLLISION = false;
    dt = 1.0/frmRate;
  }

  /**
 * Place test ball according to input value
 * Run method after user clicks RESET
 */
function placeTestBall() {
    testBall_x0 = Number(inputX.value());
    testBall_y0 = Number(inputY.value());
    testBall_vx0 = Number(inputVX.value());
    testBall_vy0 = Number(inputVY.value());
    testBall_x = testBall_x0;
    testBall_y = testBall_y0;
    testBall_vx = testBall_vx0;
    testBall_vy = testBall_vy0;
    // Red ball init position
    redBall_x = redBall_x0;
    redBall_y = redBall_y0;
    redBall_vx = redBall_vy0;
    redBall_vy = redBall_vy0;
}
/**Test ball moves */
function testBallMove(){
    //check collision
    let dx = redBall_x - testBall_x;
    let dy = redBall_y -  testBall_y;
    let dvx = redBall_vx - testBall_vx;
    let dvy = redBall_vy - testBall_vy ; 

    let t_ = abs((-sqrt((sq(dvx) + sq(dvy))*sq(d_ball) - sq(dx*dvy - dy*dvx)) - (dx*dvx + dy*dvy))/(sq(dvx) + sq(dvy))); 

     //if (abs(sq(redBall_x - testBall_x)+sq(redBall_y - testBall_y)) <= sq(d_ball) && !COLLISION){ 
    if (t_ <= dt && !COLLISION){
        COLLISION = true;
     }else{					
        COLLISION = false;
    }

    if (COLLISION){

        beta = atan2(testBall_y - redBall_y, testBall_x - redBall_x);
        phi = radians(beta) - HALF_PI;
                
        // collision (1)
        // zentrale und tangentiale Komponenten   
        console.log("beta: " + beta);
        console.log("phi: " + phi);
        result = rotateVector(testBall_vx0, testBall_vy0, phi);
        v1T = result[0];
        v1Z = result[1];
        console.log("v1T " + v1T);
        console.log("v1Z " + v1Z);

        result = rotateVector(redBall_vx0, redBall_vy0, phi);
        v2T = result[0];
        v2Z = result[1];
        console.log("v2T " + v2T);
        console.log("v2Z " + v2Z);

        // collision (2)
        // Energieübertragung

        v1Z_= ((m1-m2)*v1Z+2*m2*v2Z)/(m1+m2);  // Radialgeschwindigkeiten nach dem Stoß                   
        v1T_ = v1T;                            // Tangentialgeschwindigkeiten
        console.log("v1T_ " + v1T_);
        console.log("v1Z_ " + v1Z_);                        

        v2Z_= ((m2-m1)*v2Z+2*m1*v1Z)/(m1+m2);       
        v2T_ = v2T;                            // keine Tangentialk. auf B, da keine Wechselwirkung!
        console.log("v2T_ " + v2T_);
        console.log("v2Z_ " + v2Z_);

        result = rotateVector(v1T_, v1Z_, -phi);
        v1x_ = result[0];
        v1y_ = result[1];
        console.log("v1x_ " + v1x_);
        console.log("v1y_ " + v1y_); 

        result = rotateVector(v2T_, v2Z_, -phi);
        v2x_ = result[0];
        v2y_ = result[1];
        console.log("v2x_ " + v2x_);
        console.log("v2y_ " + v2y_); 
        v1y_ = v1y_ - v2y_;
        v2y_ = 0;
    
       // Nach dem Stoß   
        redBall_vx = v2x_;
        redBall_vy = v2y_;
        testBall_vx = v1x_;
        testBall_vy = v1y_;
        COLLISION = false;
        console.log(redBall_vx);
    }
    
    testBall_x += testBall_vx*dt
    testBall_y += testBall_vy*dt;
    
    if (testBall_y <= r_ball){
      testBall_y = r_ball;
      //testBall_vy = -testBall_vy;
    }

    redBall_x += redBall_vx * dt
    redBall_y += redBall_vy * dt;

    if (redBall_y <= r_ball ){
      redBall_y = r_ball;
      //redBall_vy = -redBall_vy;
    }  
}

/* function from Dr. Volkmar Naumburger */
function rotateVector(x, y, phi)
  {
    angleMode(RADIANS);
    var u = x*cos(phi) + y*sin(phi);  // tangentiale K.
    var v = -x*sin(phi) + y*cos(phi); // zentrale K.
    return [u, v];
  }
  
// function rotateVector(x, y, phi)
// 	{
// 		var u = x*cos(phi) - y*sin(phi);
// 		var v = x*sin(phi) + y*cos(phi);
// 		return [u, v];
// 	}