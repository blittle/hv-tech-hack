
var fs = require('fs'),
    PNG = require('png-js');


var THRESHOLD_L = 150;
var DIFF = 180;

var height = 360;
var width = 640;

var lastDecode;

exports.start = function(stream, methods) {
  stream.on('data', function(buffer) {
    var now = new Date().getTime();
    if(!lastDecode || (now - lastDecode) > 500) {
      lastDecode = now;

      var png = new PNG(buffer);
      png.decode(function(data) {
        var xCount = 0,
              xTotal = 0,
              yCount = 0,
              yTotal = 0;

          for (var y = 0; y < height; y++) {
              for (var x = 0; x < width; x++) {
                  var idx = (width * y + x) << 2;

                  var red_delta = data[idx+1] - data[idx]
                  var blue_delta = data[idx+1] - data[idx+2]

                  if( data[idx+1] > THRESHOLD_L && red_delta > 15 && blue_delta > 15) {
                    data[idx] = 255
                    data[idx+1] = 255;
                    data[idx+2] = 255;

                    xCount++;
                    yCount++;

                    xTotal += x;
                    yTotal += y;

                  } else {
                    data[idx] = 0
                    data[idx+1] = 0;
                    data[idx+2] = 0;
                  }
              }
          }

          var avgX = Math.floor(xTotal / xCount);
          var avgY = Math.floor(yTotal / yCount);

          console.log(avgX, xCount);

          if (xCount < 20) {
            console.log('Lost visibility of the screen, shutting down');
            methods.shutdown();
          } else if( avgX < 280 ) {
            console.log('left');
            methods.right();
          } else if (avgX > 360) {
            console.log('right');
            methods.left();
          } else {
            console.log('stay center');
            methods.stop();
          }

          console.log('end', new Date().getTime());

      });
      // fs.writeFile('./data/web.png', buffer)
    }
  })
  // png.on('parsed', function() {
  //     console.log('stream parsed');
      
  // });

  // png.on('error', function() {
  //   console.log(arguments);
  // })
  // png.pipe(stream);
  // stream.pipe(png);
}