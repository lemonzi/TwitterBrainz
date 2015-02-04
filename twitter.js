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

exports.getTweets = function(query, callback) {
  if (typeof query == 'string') {
    query = [query];
  }
  query.forEach(function(q) {
    getTweetsRecursive(q, 0, callback);
  });
};

exports.getTweetsRealtime = function(query, callback) {
  var stream = T.stream('statuses/filter', {track:query});
  // When a Tweet is recieved:
  stream.on('tweet', function(tweet) {
    processTweet(tweet, callback);
  });
  stream.on('error', function(data) {
    callback(true, 'Twitter API error: ' + data.message);
  });
};

function getTweetsRecursive(query, maxId, callback) {
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
      if ((maxId === 0 || newId < maxId) && !exports.realtime) {
        setTimeout(function() {
          getTweetsRecursive(query, newId, callback);
        }, exports.interval * 1000);
      } else {
        console.log('Finished retrieving tweets. Connecting to realtime stream...'.gray);
        exports.realtime = true;
        exports.getTweetsRealtime(query, callback);
      }
    }
  });
}

function processTweet(tweet, callback) {
  callback(false, {
    text: tweet.text,
    username: tweet.user.screen_name,
    avatar: tweet.user.profile_image_url,
    raw: tweet
  });
}
