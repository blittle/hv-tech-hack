var client = require('./client');

var command = process.argv[2];

var started = false;

if(command == 'start') {
    started = true;
    client.start(function() {
        client.right(4);
        setTimeout(function() {
            client.left(4);
        }, 4000);
    });
} else if(command === 'reset') {
    client.reset();
} else {
    client.end();
}

process.on('exit', function(code) {
    if(!started) return;
    client.end();
});


