/** Co-ordinates Transformation 
 *  Codes from Prof.Naumburger
 **/ 

//----Transformation from kart. to intern---//
function kToXi(a)
{ // a is kart. value 
  return(a + xi0);
}

function kToYi(b)
{ // b is kart. value */
  return(yi0 - b);
}

//----Transformation from intern to kart. ---//
function iToXk(a)
{ // a is intern value 
  return(a - xi0);
}
  
function iToYk(b)
{ // b is intern value 
  return(yi0 - b);
}