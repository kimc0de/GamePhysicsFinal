/* This file handles Buttons and Input fields */

var butonX, buttonY, buttonW, buttonH, buttonName, buttonColor; // Main Start/Reset button
var START = false; //start/reset of the main button
var startIsClicked = false;
// Button Objekt
Button = function (xPos, yPos, width, height) {
  this.xPos = xPos;
  this.yPos = yPos;

  this.drawButton = function (color, name) {
    strokeWeight(2);
    stroke(0);
    fill(color);
    rect(xPos, yPos, width, height, 5);
    strokeWeight(0.5);
    fill(0);
    textSize(12);
    text(name, xPos + 20, yPos + 20);
  }
}

/** Set up main start/reset button */
function setupButtons() {
  buttonX = Width/2-40;
  buttonY = Height - 100;
  buttonW = 80;
  buttonH = 30;
  buttonColor = '#77FF33';
  buttonName = "START";
  startButton = new Button(buttonX, buttonY, buttonW, buttonH);
}

function drawButtons() {
  startButton.drawButton(buttonColor, buttonName);
}

/** 
 * Start is clicked.Change name & color of the button. Set up balls for flying.
 * Reset is clicked. Reset balls to init positions 
 */
function startButtonIsClicked() {
  if (buttonName === "START") {
    START = true;
    buttonColor = '#FF5533';
    buttonName = "RESET";
    
  } else { //reset the scene
    status_left = "init";
    status_right = "init";
    v_left = 0.0;
    v_right = 0.0;
    s_left = 0.0;
    s_right = 0.0;
    mouseLeftActive = true;
    mouseRightActive = true;
    buttonColor = '#77FF33';
    buttonName = "START";
    redBall_x = redBall_x0;
    redBall_y = redBall_y0;
    redBall_vx = redBall_vy0;
    redBall_vy = redBall_vy0;
    leftScore = 0 ;
    rightScore = 0;
    leftTurn = false;
    rightTurn = false;
    startIsClicked = false;
  }
}

