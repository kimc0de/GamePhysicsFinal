
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
    
     if (buttonX < mouseX && buttonX+buttonW > mouseX && buttonY < mouseY && buttonY+buttonH > mouseY) { 
         startButtonIsClicked();
      }
     if (modeX < mouseX && modeX+modeButtonW > mouseX && modeY < mouseY && modeY+modeButtonH > mouseY) { 
        modeButtonIsClicked();
     }
     if (resetX < mouseX && resetX+resetButtonW > mouseX && resetY < mouseY && resetY+resetButtonH > mouseY) { 
       if(TEST){
        resetButtonIsClicked();
       }
   }
  }

  