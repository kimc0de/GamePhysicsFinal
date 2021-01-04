function mouseDragged(){
    let d1 = dist(mouseX,mouseY,w1x, w1y);
      if (d1 < r_bubble){
        wippeLeftMove();
  }
    
    let d2 = dist(mouseX,mouseY,w2x, w2y);
      if (d2 < r_bubble){
        wippeRightMove();
      }
  }
  
  
  function mouseReleased(){
    releaseWippe();
  }
  
  function mouseClicked(){
    /* If mouse clicks on the button*/
     if (buttonX < mouseX && buttonX+buttonW > mouseX && buttonY < mouseY && buttonY+buttonH > mouseY) { //check if it clicks the button
         buttonIsClicked();
       }
  }

  