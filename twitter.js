var Twit = require('twit'),
    NB = require('nodebrainz'),
    request = require('request-json'),
    secrets = require('./secrets.json');

// THIS IS FOR TWITTER

var T = new Twit(secrets.twitter);

exports.getTweets = function(query, callback) {
  getTweetsRecursive(query, 0, callback);
};

exports.getTweetsRealtime = function(query, callback) {
  var stream = T.stream('statuses/filter', {track:query});
  // When a Tweet is recieved:
  stream.on('tweet', function(tweet) {
    processTweet(tweet, callback);
  });
  stream.on('error', function(data) {
    callback(true, 'Twitter API error: ' + data);
  });
};

function getTweetsRecursive(query, maxId, callback) {
  var newId = maxId || Number.MAX_VALUE;
  console.log('Loading more tweets...'.gray);
  T.get('search/tweets', {
    q: query,
    count: 100,
    result_type: 'recent',
    max_id: maxId,
    location: [-180, -90, 180, 90] ///// THIS IS WROOOOOOOOONG
  }, function(err, data, response) {
    if (err) callback(true, err);
    else {
      data.statuses.forEach(function(tweet) {
        newId = Math.min(newId, tweet.id);
        processTweet(tweet, callback);
      });
      if (maxId === 0 || newId < maxId) {
        setTimeout(function() {
          getTweetsRecursive(query, newId, callback);
        }, 120000);
      } else {
        console.log('Finished retrieving tweets. Connecting to realtime stream...'.gray);
        exports.getTweetsRealtime(query, callback);
      }
    }
  });
}

function processTweet(tweet, callback) {
  var location;
  if (!tweet.coordinates) {
    // do something with the user
  } else {
    location = tweet.coordinates.coordinates;
  }
  callback(false, {
    text: tweet.text,
    username: tweet.user.screen_name,
    avatar: tweet.user.profile_image_url,
    location: location
  });
}
