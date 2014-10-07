var PNG = require('png-js');
PNG.decode('./data/test.png', function(pixels) {
  console.log(pixels);
    // pixels is a 1d array (in rgba order) of decoded pixel data
});