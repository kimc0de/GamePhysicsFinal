/** Co-ordinates Transformation 
 *  Codes from Prof.Naumburger
 **/

//----Transformation from kart. to intern---//
function kXi(a) { // a is kart. value 
  return (a + xi0);
}

function kYi(b) { // b is kart. value */
  return (yi0 - b);
}

//----Transformation from intern to kart. ---//
function iXk(a) { // a is intern value 
  return (a - xi0);
}

function iYk(b) { // b is intern value 
  return (yi0 - b);
}