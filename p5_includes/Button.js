/* Button */
let butonX;                                   
let buttonY;
let buttonW;
let buttonH ;
var buttonName ;
var buttonColor;
var START = false;
// Button Objekt
Button = function(xPos, yPos){
	this.xPos = xPos;
	this.yPos = yPos;

	this.drawButton = function (color, name){
		strokeWeight(2);
		stroke(0);
		fill(color);
		rect(xPos, yPos, buttonW, buttonH,5);
		strokeWeight(0.5);
        fill(0);
		text(name, xPos+20, yPos + 20);
	}
}

  /* Change name & color of the button */
  function buttonIsClicked(){
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