var util = require("util"),
    twitter = require("twitter"),
    twitter_auth = require("./twitter_auth");

var twit = new twitter(twitter_auth.auth);

console.log("Connecting to Twitter stream...");
twit.stream('statuses/sample', function(stream) {
    stream.on('data', function(data) {
        console.log(util.inspect(data));
    });
});
