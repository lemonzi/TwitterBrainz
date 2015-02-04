var Twit = require('twit'),
    NB = require('nodebrainz'),
    request = require('request-json'),
    secrets = require('./secrets.json');

var T = new Twit(secrets.twitter);

// Interval in seconds between calls to the Twitter Search API
// You can modify this during the runtime
// No effect after switch to realtime
exports.interval = 120;

// Start using the Twitter Search API. When it does not
// return more data, we switch to the Streaming API.
// This switch can be forced by changing this.
exports.realtime = false;

// How many tweets we get with each call to
// the Twitter Search API
exports.count = 100;

exports.setRealtime = function(rt) {
  exports.realtime = rt;
  if (rt) exports.getTweetsRealtime(q, cb);
};

var q, cb;
exports.getTweets = function(queries, callback) {
  q = queries; cb = callback;
  if (typeof queries == 'string') {
    queries = [queries];
  }
  var getTweetsRecursive = function(query, maxId, callback) {
    if (exports.realtime) {
      exports.getTweetsRealtime(queries);
      return;
    }
    var newId = maxId || Number.MAX_VALUE;
    console.log('Loading more tweets...'.gray);
    T.get('search/tweets', {
      q: query,
      count: exports.count,
      result_type: 'recent',
      max_id: maxId
    }, function(err, data, response) {
      if (err) callback(true, err.message);
      else {
        data.statuses.forEach(function(tweet) {
          newId = Math.min(newId, tweet.id);
          processTweet(tweet, callback);
        });
        if ((maxId === 0 || newId < maxId)) {
          setTimeout(function() {
            getTweetsRecursive(query, newId, callback);
          }, exports.interval * 1000);
        } else {
          console.log('Finished retrieving tweets. Connecting to realtime stream...'.gray);
          exports.realtime = true;
        }
      }
    });
  };
  queries.forEach(function(q) {
    getTweetsRecursive(q, 0, callback);
  });
};

var connected = false;
exports.getTweetsRealtime = function(query, callback) {
  if (connected) return;
  connected = true;
  var stream = T.stream('statuses/filter', {track:query});
  // When a Tweet is recieved:
  stream.on('tweet', function(tweet) {
    if (!exports.realtime) {
      stream.stop();
      connected = false;
      exports.getTweets(query, callback);
    }
    processTweet(tweet, callback);
  });
  stream.on('error', function(data) {
    callback(true, 'Twitter API error: ' + data.message);
  });
};

function processTweet(tweet, callback) {
  callback(false, {
    text: tweet.text,
    username: tweet.user.screen_name,
    avatar: tweet.user.profile_image_url,
    raw: tweet
  });
}
