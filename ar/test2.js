var fs = require('fs'),
    PNG = require('pngjs').PNG;

var THRESHOLD_L = 200;
var THRESHOLD_U = 180;

fs.createReadStream('data/test2.png')
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function() {
        var xCount = 0,
            xTotal = 0,
            yCount = 0,
            yTotal = 0;

        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                var idx = (this.width * y + x) << 2;

                if( this.data[idx+1] > THRESHOLD_L && this.data[idx] < THRESHOLD_U && this.data[idx+2] < THRESHOLD_U) {
                  this.data[idx] = 255
                  this.data[idx+1] = 255;
                  this.data[idx+2] = 255;

                  xCount++;
                  yCount++;

                  xTotal += x;
                  yTotal += y;

                } else {
                  this.data[idx] = 0
                  this.data[idx+1] = 0;
                  this.data[idx+2] = 0;
                }
            }
        }

        var avgX = Math.floor(xTotal / xCount);
        var avgY = Math.floor(yTotal / yCount);

        console.log(avgX);

        this.pack().pipe(fs.createWriteStream('out.png'));
    });