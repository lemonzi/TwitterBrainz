var Twit = require('twit'),
    NB = require('nodebrainz'),
    request = require('request-json'),
    moment = require('moment'),
    secrets = require('./secrets.json');

var T = new Twit(secrets.twitter);

// Interval in seconds between calls to the Twitter Search API
// You can modify this during the runtime
// No effect after switch to realtime
exports.interval = 120;

// How many tweets we get with each call to
// the Twitter Search API
exports.count = 100;

exports.getTweets = function(queries, callback) {
  if (typeof queries == 'string') {
    queries = [queries];
  }
  var getTweetsRecursive = function(query, maxId, callback) {
    var newId = maxId || Number.MAX_VALUE;
    console.log('Loading more tweets...'.gray);
    T.get('search/tweets', {
      q: query,
      count: exports.count,
      // result_type: 'recent',
      result_type: 'mixed',
      max_id: maxId
    }, function(err, data, response) {
      if (err) callback(true, err.message);
      else {
        data.statuses.forEach(function(tweet) {
          newId = Math.min(newId, tweet.id);
          processTweet(tweet, callback);
        });
        if (newId >= maxId) {
          // start over
          newId = Number.MAX_VALUE;
        }
        setTimeout(function() {
          getTweetsRecursive(query, newId, callback);
        }, exports.interval * 1000);
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
  console.log('Connecting to realtime stream...'.gray);
  connected = true;
  var stream = T.stream('statuses/filter', {track:query.join(",")});
  // When a Tweet is recieved:
  stream.on('tweet', function(tweet) {
    processTweet(tweet, callback);
  });
  stream.on('error', function(data) {
    callback(true, 'Twitter API error: ' + data.message);
  });
};

function processTweet(tweet, callback) {
  var time = moment(tweet.created_at, 'ddd MMM DD HH:mm:ss ZZZZZ YYYY', 'en').utc();
  time.utcOffset(tweet.user.utc_offset / 60);
  callback(false, {
    text: tweet.text,
    username: tweet.user.screen_name,
    avatar: tweet.user.profile_image_url,
    // raw: tweet,
    time: time
  });
}
