/** This file handles mouse events */

function mouseDragged() {
  let d1 = dist(mouseX, mouseY, w1x, w1y);
  if (d1 < r_bubble) wippeLeftMove();

  let d2 = dist(mouseX, mouseY, w2x, w2y);
  if (d2 < r_bubble) wippeRightMove();
}

function mouseReleased() {
  releaseWippe();
}

function mouseClicked() {
  if (buttonX < mouseX && buttonX + buttonW > mouseX && buttonY < mouseY && buttonY + buttonH > mouseY) {
    startButtonIsClicked();
  }
  /*****Testing buttons*****/
  if (modeX < mouseX && modeX + modeW > mouseX && modeY < mouseY && modeY + modeH > mouseY) {
    modeButtonIsClicked();
  }
  if (resetX < mouseX && resetX + resetW > mouseX && resetY < mouseY && resetY + resetH > mouseY) {
    if (TEST) {
      resetButtonIsClicked();
    }
  }
  if (startX < mouseX && startX + startW > mouseX && startY < mouseY && startY + startH > mouseY) {
      startTestIsClicked();
  }
  /*************************/
}