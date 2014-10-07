var util = require("util"),
    twitter = require("twitter"),
    twitter_auth = require("./twitter_auth"),
    firebase = require("firebase"),
    //MAGIC_HASH_TAG = "#utahtechweek",
    MAGIC_HASH_TAG = "#davetest",
    tallies,
    twitter_stream,
    database = new firebase("https://crackling-fire-2734.firebaseio.com/"),
    initial_tallies = {red: 0, green: 0, blue: 0};

process.on('exit', function(code) {
    if (twitter_stream) {
        console.log("Closing twitter stream");
        twitter_stream.destroy();
    }
});

database.on('value', function initial_read(snapshot) {
  database.off('value', initial_read);
  var snapshot = snapshot.val();
  if (!snapshot) {
    tallies = initial_tallies
    database.set({tallies: tallies, winner: null});
  } else {
    tallies = snapshot.tallies;
    console.log("Initial tallies:", tallies)
  }
  start_streaming();
});

function start_streaming() {
  var twit = new twitter(twitter_auth.auth);
  twit.stream('statuses/filter', {track: [MAGIC_HASH_TAG]}, function(stream) {
      twitter_stream = stream;
      console.log("Listening for tweets with hashtag", MAGIC_HASH_TAG, "...");
      twitter_stream.on('data', function(tweet) {
          console.log("Tweet: " + tweet.text);
          var words = tweet.text.split(/\s+/);
          for (var i=0; i<words.length; i++) {
              var word = words[i].toLowerCase();
              if (word in tallies) {
                  tallies[word]++;
                  console.log("  Vote word", word, "up to", tallies[word]);
                  database.update({tallies: tallies});
              }
          }

          var winner = null;
          for (var tally in tallies) {
              if (!winner || tallies[tally] > tallies[winner]) {
                  winner = tally;
              }
          }

          database.update({winner: winner});
          console.log("  Setting winner to:", winner);
      });
  });
}
