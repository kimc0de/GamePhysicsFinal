/* This file handles Buttons and Input fields */

var butonX, buttonY, buttonW, buttonH, buttonName, buttonColor; // Start/Reset button
var modeX, modeY, modeButtonW, modeButtonH, modeButtonColor, modeButtonName;
var startButton, modeButton, resetButton;
var inputX, inputY, inputVX, inputVY;
var START = false;
var TEST = false;

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
/** Input fields for testing */
function setupInput() {
  /******** Input in meter ********/
  inputX = createInput('0.3');
  inputX.position(35, 35);
  inputX.size(35);
  inputY = createInput('0.3');
  inputY.position(35, 55);
  inputY.size(35);
  inputVX = createInput('0.0');
  inputVX.position(35, 75);
  inputVX.size(35);
  inputVY = createInput('0.0');
  inputVY.position(35, 95);
  inputVY.size(35);
}

/** Set up all buttons */
function setupButtons() {
  /****** Reset Button ********/
  buttonX = 460;
  buttonY = 250;
  buttonW = 80;
  buttonH = 30;
  buttonColor = '#77FF33';
  buttonName = "START";
  startButton = new Button(buttonX, buttonY, buttonW, buttonH);

  /****** Testing buttons & text fields ********/
  modeX = 60;
  modeY = 250;
  modeButtonW = 80;
  modeButtonH = 30;
  modeButtonColor = '#16c79a';
  modeButtonName = "TEST";
  modeButton = new Button(modeX, modeY, modeButtonW, modeButtonH);

  resetX = 160;
  resetY = 250;
  resetButtonW = 80;
  resetButtonH = 30;
  resetButtonColor = '#16c79a';
  resetButtonName = "RESET";
  resetButton = new Button(resetX, resetY, resetButtonW, resetButtonH);

}

function drawButtons() {
  startButton.drawButton(buttonColor, buttonName);
  modeButton.drawButton(modeButtonColor, modeButtonName);
  resetButton.drawButton(resetButtonColor, resetButtonName);

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
  }
}

/**
 * Test mode button is clicked. Test mode on. Test ball appears.
 */
function modeButtonIsClicked() {
  if (modeButtonName === "TEST") { //test mode on
    TEST = true;
    modeButtonColor = '#FF5533';
    modeButtonName = "OFF";
    mouseLeftActive = false; //disable Wippe movement
    mouseRightActive = false;
    testBallVisible = true;
    setupInput();
    placeTestBall();
  } else { //turn off test mode
    TEST = false;
    mouseLeftActive = true;
    mouseRightActive = true;
    modeButtonColor = '#16C79A';
    modeButtonName = "TEST";
    testBallVisible = false;
    inputX.hide();
    inputY.hide();
    inputVX.hide();
    inputVY.hide();
  }
}

/**
 * resetButton for testing
 * Clickable only when Test mode is ON
 * Reset is clicked, test ball is positioned accordingly.
 */
function resetButtonIsClicked() {
  resetButtonColor = '#FF5533';
  mouseLeftActive = false; //disable Wippe movement
  mouseRightActive = false;
  placeTestBall();
  setTimeout(() => {
    resetButtonColor = '#16C79A';
  }, 100);

}