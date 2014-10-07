var client = require('./client');
var fb     = require('./fb-adapter');

var command = process.argv[2];

var started = false;

if(command == 'start') {
    started = true;
    client.start();
}

process.on('exit', function(code) {
    if(!started) return;
    started = false;
    client.end();
});

