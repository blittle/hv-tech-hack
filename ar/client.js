var arDrone = require('ar-drone');
var async   = require('async');
var client  = arDrone.createClient();

var isMoving = false;

var timing = 1000,  // The time it takes for the drone to move from one computer to the next at a specific speed
    speed  = .2;    // The speed that the drone moves at

exports.start = function() {
    isMoving = true;

    client.takeoff(function() {
        client.stop();
        client.on('navdata', console.log);    
        isMOving = false;
    });
}

exports.left = function(steps) {
    if(isMoving) return;
    isMoving = true;
    client.left(speed);
    setMovingTimeout(steps);
}

exports.right = function(steps) {
    if(isMoving) return;
    isMoving = true;
    client.right(speed);
    setMovingTimeout(steps);
}

exports.end = function() {
    client.stop();
    client.land();
}

function setMovingTimeout(steps) {
    setTimeout(function() {
        client.stop();
        isMoving = false;
    }, steps * timing);
}