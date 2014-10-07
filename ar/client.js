var arDrone = require('ar-drone');
var async   = require('async');
var client  = arDrone.createClient();

var isMoving = false;

var timing = 1000,  // The time it takes for the drone to move from one computer to the next at a specific speed
    speed  = .1;    // The speed that the drone moves at

exports.start = function(cb) {
    isMoving = true;
    console.log('started');
    client.on('navdata', console.log);    
    
    client.takeoff(function() {

        client.stop();
        console.log('took off')
        
        isMoving = false;

        if(cb) cb();
    });
}

exports.left = function(steps) {
    if(isMoving) return;
    console.log('moving left', steps);
    isMoving = true;
    client.left(speed);
    setMovingTimeout(steps);
}

exports.right = function(steps) {
    if(isMoving) return;
    console.log('moving right', steps);
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
    }, steps * timing);
}