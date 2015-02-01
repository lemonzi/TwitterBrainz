var Twit = require('twit'),
    NB = require('nodebrainz'),
    request = require('request-json'),
    secrets = require('./secrets.json');

// THIS IS FOR TWITTER

var T = new Twit(secrets.twitter);

exports.getTweets = function(query, count, callback) {
  T.get('search/tweets', {
    q: query,
    count: count,
    location: [-180, -90, 180, 90] ///// THIS IS WROOOOOOOOONG
  }, function(err, data, response) {
    if (err) callback(true, err);
    else data.statuses.forEach(function(tweet) {
      processTweet(tweet, callback);
    });
  });
};

exports.getTweetsRealtime = function(query, callback) {
  var stream = T.stream('statuses/filter', {track:query});
  // When a Tweet is recieved:
  stream.on('tweet', function(tweet) {
    processTweet(tweet, callback);
  });
  stream.on('error', function(data) {
    callback(true, 'Twitter API error');
  });
};

var processTweet = function(tweet, callback) {
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
};

// THIS IS FOR MUSICBRAINZ (already glued to acousticbrainz)

var nb = new NB({});
exports.musicBrainz = function(query, mbCallback) {
  nb.search('recording', query, function(err,resp){
    var songs = resp.recordings;
    if (!songs) mbCallback(true, 'No songs found');
    // now, query acousticBrainz
    var songCount = 0;
    var abCallback = function(err, resp) {
      if (err) {
        songCount++;
        if (songCount < songs.length)
          acousticBrainz(songs[songCount].id, abCallback);
        else
          mbCallback(true, 'No acoustic features found');
      } else {
        var title = songs[songCount].title;
        var artist = songs[songCount]['artist-credit'][0].artist.name;
        mbCallback(false, {
          title: title,
          artist: artist,
          tonality: resp
        });
      }
    };
    acousticBrainz(songs[0].id, abCallback);
  });
};

// THIS IS FOR ACOUSTICBRAINZ

var acousticBrainzClient = request.newClient('http://acousticbrainz.org/');
exports.acousticBrainz = function(id, callback) {
  acousticBrainzClient.get(id+'/low-level', function(err, res, body) {
    if (res.statusCode == 404) {
      callback(true, 'No acoustic features found');
    } else {
      var key = body.tonal.chords_key;
      var scale = body.tonal.chords_scale;
      callback(false, {key:key, scale:scale});
    }
  });
};
