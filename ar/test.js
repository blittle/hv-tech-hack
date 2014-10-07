var arDrone = require('ar-drone');
var client  = arDrone.createClient();

var stream = client.getPngStream();

var cv = require('opencv');

var s = new cv.ImageStream()

var lowThresh = 0;
var highThresh = 100;
var nIters = 2;
var minArea = 2000;

var BLUE  = [0, 255, 0]; // B, G, R
var RED   = [0, 0, 255]; // B, G, R
var GREEN = [0, 255, 0]; // B, G, R
var WHITE = [255, 255, 255]; // B, G, R

s.on('load', function(matrix){
  console.log(matrix);
})
var time = (new Date()).getTime();
var i = 0;

s.on('data', function(im) {
    i++;

    var width = im.width()
    var height = im.height()
    
    var x, y;
    // for(x=0; x < width; x++) {
    //     for(y=0; y < height; y++) {
    //         console.log(im.get(x,y))
    //     }
    // }
    im.save('./data/' + time + '-' + i + '.jpg');
})

stream.pipe(s);