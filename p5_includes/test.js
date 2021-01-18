/** This file is for testing collision */

/** Test buttons */
var modeX, modeY, modeW, modeH, modeColor, modeName; //Mode button for testing
var resetX, resetY, resetW, resetH, resetColor, resetName; // Reset button for testing
var startX, startY, startW, startH, startColor, startName; // Start button for testing
var startButton, modeButton, resetButton, startTestButton;
var inputX, inputY, inputVX, inputVY;

var TEST = false;
var COLLISION = false;
var TESTBALLMOVE = false;

/** Test ball position, speed variables */
var testBall_vx, testBall_vy, testBall_vx0, testBall_vy0;
var testBall_x0, testBall_y0, testBall_x, testBall_y;
var testBallVisible = false;
var testball_status;

var dtTestBall_ = 0.0;

var dx;
var dy;
var dvx;
var dvy; 
var t_= 0;
var beta = 0;          // Stoßwinkel
var phi, gamma1, gamma2;   //// Ergänzungswinkel
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
    inputX = createInput('0.1');
    inputX.position(35, 35);
    inputX.size(35);
    inputY = createInput('0.1');
    inputY.position(35, 55);
    inputY.size(35);
    inputVX = createInput('-0.5');
    inputVX.position(35, 75);
    inputVX.size(35);
    inputVY = createInput('-0.5');
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
      touchedGround1 = false;
      touchedGround2 = false;
      
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
    // Red ball returns to init position
    redBall_x = redBall_x0;
    redBall_y = redBall_y0;
    redBall_vx = redBall_vy0;
    redBall_vy = redBall_vy0;
    // Red ball returns to init position
    redBall_x = redBall_x0;
    redBall_y = redBall_y0;
    redBall_vx = redBall_vy0;
    redBall_vy = redBall_vy0;
    COLLISION = false;
    touchedGround1 = false;
    touchedGround2 = false;
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
    redBall_x = redBall_x0;
    redBall_y = redBall_y0;
    redBall_vx = redBall_vy0;
    redBall_vy = redBall_vy0;
    dtTestBall = 1.0/frmRate;
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
    testBall_vy = testBall_vy0
}
/**Test ball moves */
function testBallMove(){
    //check collision
     if (abs(sq(redBall_x - testBall_x)+sq(redBall_y - testBall_y)) <= sq(d_ball) && !COLLISION){ 
        COLLISION = true;
     }else{					
        COLLISION = false;
      }

    if (COLLISION){
        beta = atan2(testBall_y - redBall_y, testBall_x - redBall_x);
       
        phi = beta - HALF_PI;
                
        // im Stoßmoment (1)
        // zentrale und tangentiale Komponenten   

        result = rotateVector(testBall_vx0, testBall_vy0, phi);
        v1T = result[0];
        v1Z = result[1];
        result = rotateVector(redBall_vx0, redBall_vy0, phi);
        v2T = result[0];
        v2Z = result[1];
 
        // im Stoßmoment (2)
        // Energieübertragung

        v1Z_= ((m1-m2)*v1Z+2*m2*v2Z)/(m1+m2);  // Radialgeschwindigkeiten nach dem Stoß                   
        v1T_ = v1T;                            // Tangentialgeschwindigkeiten
        v1_ = sqrt(sq(v1Z_)+sq(v1T_));         // Betrag v1_
        v2Z_= ((m2-m1)*v2Z+2*m1*v1Z)/(m1+m2);       
        v2T_ = v2T;                            // keine Tangentialk. auf B, da keine Wechselwirkung!
        v2_ = sqrt(sq(v2Z_) + sq(v2T_));       // Betrag v2_
        
        // x- u. y-Komponenten 
        result = rotateVector(v1T_, v1Z_, -phi);
        v1x_ = result[0];
        v1y_ = result[1];
        result = rotateVector(v2T_, v2Z_, -phi);
        v2x_ = result[0];
        v2y_ = result[1];
        v1y_ = v1y_ - v2y_;
        v2y_ = 0;
        result = rotateVector(v2x_, v2y_, phi);
        v2T_ = result[0];
        v2Z_ = result[1];

       // Nach dem Stoß   
        redBall_vx = v2x_;
        redBall_vy = v2y_;
        testBall_vx = v1x_;
        testBall_vy = v1y_;
        v1 = sqrt(sq(testBall_vx) + sq(testBall_vy));
        v2 = sqrt(sq(redBall_vx) + sq(redBall_vy));
        COLLISION = false;
    }
    
    testBall_x += testBall_vx*dt
    testBall_y += testBall_vy*dt;
    
    if (testBall_y <= r_ball && !touchedGround1){
      testBall_y = r_ball;
      testBall_vy = -testBall_vy;
      touchedGround1 = true;
    }

    redBall_x += redBall_vx* dt
    redBall_y += redBall_vy * dt;

    if (redBall_y <= r_ball && !touchedGround2){
      redBall_y = r_ball;
      redBall_vy = -redBall_vy;
      touchedGround2 = true;
    }  
}

/* function from Dr. Volkmar Naumburger */
// function rotateVector(x, y, phi) //didn't work  ?????
// 	{
// 		var u = x*cos(phi) + y*sin(phi); 
// 		var v = -x*sin(phi) + y*cos(phi);
// 		return [u, v];
//   }
  
function rotateVector(x, y, phi)
	{
		var u = x*cos(phi) - y*sin(phi);
		var v = x*sin(phi) + y*cos(phi);
		return [u, v];
	}