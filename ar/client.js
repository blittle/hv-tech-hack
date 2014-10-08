var arDrone = require('ar-drone');
var async   = require('async');
var client  = arDrone.createClient();
var positionReader = require('./positionReader');

var isMoving = false;

var timing = 1000,  // The time it takes for the drone to move from one computer to the next at a specific speed
    speed  = .1;    // The speed that the drone moves at

exports.start = function(cb) {
    isMoving = true;
    console.log('started');
    // client.on('navdata', console.log);    

    // client.takeoff(function() {

    //     client.stop();
    //     console.log('took off')
        
    //     isMoving = false;

        var stream = client.getPngStream();

        positionReader.start(stream, {
            left: function() {
                client.right(.1);
                // right();
            },
            right: function() {
                client.left(.1);
                // left();
            },
            shutdown: function() {
                isMoving = true;
                client.stop();
                client.land();
            },
            stop: function() {
                client.stop();
            }
        })
    // });
}

function left(steps) {
    if(isMoving) return;
    isMoving = true;
    client.left(speed);
    setMovingTimeout(steps);
}

function right(steps) {
    if(isMoving) return;
    isMoving = true;
    client.right(speed);
    setMovingTimeout(steps);
}

exports.end = function() {
    client.stop();
    client.land();
}

exports.reset = function() {
    client.disableEmergency();
}

function setMovingTimeout(steps) {
    setTimeout(function() {
        client.stop();
        isMoving = false;
    }, 1000);
}