var cv = require('opencv')
  , assert = require('assert')
  , fs =require('fs')

cv.readImage("./data/1412716719943-50.jpg", function(err, img){
  console.log(img.__proto__);

  var height = img.height(),
      width = img.width();

  var x, y;
  for(x = 0; x < width; x++) {
    for(y = 0; y < width; y++) {
      console.log(img.pixel(x, y))
    }
  }
});