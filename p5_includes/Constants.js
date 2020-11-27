  function setup(){
  //     /* Button */
  // resetButton.drawButton(buttonColor, buttonName);
      /* Text */
  fill(0, 0, 0);
  textSize(12);
  text("Ball Game - Kim Ngan Le Dang", 220, 30);
  //text("Ubung 5", 275, 55);
  text("Treffer 0:0", 270, 55);

  /* Ground */
  strokeWeight(1);
  stroke(0);
  fill(245, 237, 198);
  rect(kXi(groundX * M), kYi(groundY * M), groundW * M, groundH * M);

  /* Red lines underground */
  strokeWeight(4);
  stroke(255, 0, 0);
  line(kXi((-redline_dis + 0.02) * M), kYi(groundY) + 2, kXi((-redline_dis - 0.02) * M), kYi(groundY) + 2); //left 
  line(kXi((redline_dis + 0.02) * M), kYi(groundY) + 2, kXi((redline_dis - 0.02) * M), kYi(groundY) + 2); //right

  /* Wippe */
  strokeWeight(1);
  stroke(0);
  fill(49, 96, 178); //triangles color
  //triangles
  //left
  triangle(kXi(-wip_dis * M), kYi(groundY) - tri_height * M, //top
    kXi((-wip_dis + 0.04) * M), kYi(groundY), //right
    kXi((-wip_dis - 0.04) * M), kYi(groundY)); //left
  //right
  triangle(kXi(wip_dis * M), kYi(groundY) - tri_height * M, //top
    kXi((wip_dis + 0.04) * M), kYi(groundY), //right
    kXi((wip_dis - 0.04) * M), kYi(groundY)); //left

}