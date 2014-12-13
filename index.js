var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    Twit = require('twit'),
    io = require('socket.io').listen(server),
    NB = require('nodebrainz'),
    request = require('request-json'),
    secrets = require('./secrets.json');

// server.listen(8080);

/*

// Keyboards to listen for
var watchList = ['nashville'];

io.sockets.on('connection', function (socket) {
    // Send the Tweet to the browser
    getTweets({track: watchList}, function(err, resp) {
      io.sockets.emit('stream', linkify(resp.text), resp.username, resp.avatar);
    });
});

*/

function linkify(text) {
  // Makes links clickable
  var turl = text.match( /(http|https|ftp):\/\/[^\s]*/i );
  if ( turl !== null )
    turl = text.replace( turl[0], '<a href="'+turl[0]+'" target="new">'+turl[0]+'</a>' );
  else
    turl = text;
  return turl;
}

// THIS IS FOR TWITTER

var T = new Twit(secrets.twitter);

function getTweets(query, count, callback) {
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
}

function getTweetsRealtime(query, callback) {
  var stream = T.stream('statuses/filter', {track:query});
  // When a Tweet is recieved:
  stream.on('tweet', function(tweet) {
    processTweet(tweet, callback);
  });
  stream.on('error', function(data) {
    callback(true, 'Twitter API error');
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

// THIS IS FOR MUSICBRAINZ

var nb = new NB({});
function musicBrainz(query, mbCallback) {
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
}

// THIS IS FOR ACOUSTICBRAINZ

var acousticBrainzClient = request.newClient('http://acousticbrainz.org/');
function acousticBrainz(id, callback) {
  acousticBrainzClient.get(id+'/low-level', function(err, res, body) {
    if (res.statusCode == 404) {
      callback(true, 'No acoustic features found');
    } else {
      var key = body.tonal.chords_key;
      var scale = body.tonal.chords_scale;
      callback(false, {key:key, scale:scale});
    }
  });
}

// TEST TWITTER

var cbTwtr = function(err, resp) {
  if (err) console.log('error:', resp);
  else /*if (resp.location)*/ console.log(resp.text);
};

var keywords = [
  'itunes apple com album',
  'openspotify com',
  '#Now Playing',
  '#nowplaying',
  '#SoundCloud',
  '#GooglePlayMusic',
  '#np',
  '@doubleTwist',
  '#Spotify',
  '@YouTube',
  '#PowerAMP',
  '#EverythingThatRocks',
  'MakeAVoice Radio: Now Playing',
  'New Music Alert',
  '#Soulairium',
  'Check out the song',
  'PlayerPro@Android',
  'Deezer',
  'SoundHound',
  'Posted a new song:'
];

//getTweets(keywords.join(' OR '), 1000, cbTwtr);
getTweetsRealtime(keywords, cbTwtr);

// TEST ACOUSTICBRAINZ

var cb = function(err, resp) {
  if (err) console.log('error:', resp);
  else console.log(resp);
};

//musicBrainz({recording:'Beat it', artist:'Michael Jackson'}, cb);
//musicBrainz({recording:'Smooth Criminal', artist:'Michael Jackson'}, cb);
//musicBrainz({recording:'Heal the World', artist:'Michael Jackson'}, cb);
//musicBrainz({recording:'Eine Kleine Nachtmusic', artist:'Mozart'}, cb);
//musicBrainz({recording:'Invisible kid', artist:'Metallica'}, cb);
//musicBrainz({recording:'Heal the World', artist:'Michael Jackson'}, cb);
//musicBrainz({recording:'All of me', artist:'Jon Schmidt'}, cb);
musicBrainz({artist:'Michael Jackson',limit:100},cb);
//musicBrainz({recording:'Shake it off', artist:'Taylor Swift'},cb);
//musicBrainz({recording:'Hurt', artist:'Johnny Cash'},cb);
