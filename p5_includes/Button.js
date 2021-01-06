/* Button */
var butonX, buttonY, buttonW, buttonH, buttonName, buttonColor; // Start/Reset button
var modeX, modeY,modeButtonW, modeButtonH, modeButtonColor, modeButtonName;
var startButton, modeButton, resetButton ;
var START = false;
var TEST = false;

// Button Objekt
Button = function(xPos, yPos, width, height){
	this.xPos = xPos;
	this.yPos = yPos;

	this.drawButton = function (color, name){
		strokeWeight(2);
		stroke(0);
		fill(color);
		rect(xPos, yPos, width, height,5);
		strokeWeight(0.5);
        fill(0);
		text(name, xPos+20, yPos+20);
	}
}
function setupButtons(){
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

function drawButtons(){
  startButton.drawButton(buttonColor, buttonName);
  modeButton.drawButton(modeButtonColor, modeButtonName);
  resetButton.drawButton(resetButtonColor, resetButtonName);

}
/** 
 * Start is clicked.Change name & color of the button. Set up balls for flying.
 * Reset is clicked. Reset balls to init positions 
 */
function startButtonIsClicked(){
    if (buttonName === "START") {
      START = true;
      buttonColor = '#FF5533';
      buttonName = "RESET";
    }
    else { //reset the scene
      status_left = "init";
      status_right = "init";
      v_left = 0.0;
      v_right = 0.0;
      s_left = 0.0;
      s_right = 0.0;
      mouseLeftActive = true;
      mouseRightActive =true;
      buttonColor = '#77FF33';
      buttonName = "START";
    }
  }
  
  /**
   * Test mode button is clicked. Test mode on. Test ball appears.
   */
  function modeButtonIsClicked(){
    console.log("mode button is clicked");
    if (modeButtonName === "TEST") {//test mode on
      TEST = true;
      modeButtonColor = '#FF5533';
      modeButtonName = "OFF";
      mouseLeftActive = false; //disable Wippe movement
      mouseRightActive = false;
    }
    else { //turn off test mode
      TEST = false;
      mouseLeftActive = true;
      mouseRightActive =true;
      modeButtonColor = '#16C79A';
      modeButtonName = "TEST";
    }
  }

  /**
   * Reset button for testing is clicked. Only when test mode is on
   * Test ball is positioned accordingly.
   */
  function resetButtonIsClicked(){
      console.log("reset button is clicked");
      resetButtonColor = '#FF5533';
      mouseLeftActive = false; //disable Wippe movement
      mouseRightActive = false;
      setTimeout(()=>{
        resetButtonColor = '#16C79A';
      },100);
      //TODO: get input values and place the test ball
  }