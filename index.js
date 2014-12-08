var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    Twit = require('twit'),
    io = require('socket.io').listen(server),
    NB = require('nodebrainz'),
    request = require('request-json');

// server.listen(8080);

/*

// Keyboards to listen for
var watchList = ['nashville'];

var T = new Twit({
consumer_key:           'your key here',
  consumer_secret:      'your secret here',
  access_token:         'your token here',
  access_token_secret:  'your token here'
});

io.sockets.on('connection', function (socket) {
  var stream = T.stream('statuses/filter', { track: watchList });
  // When a Tweet is recieved:
  stream.on('tweet', function (tweet) {
    turl = linkify(tweet.text);
    // Send the Tweet to the browser
    io.sockets.emit('stream',turl, tweet.user.screen_name, tweet.user.profile_image_url);
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

function acousticBrainz(id, callback) {
  var acousticBrainzClient = request.newClient('http://acousticbrainz.org/');
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

// TEST

var cb = function(err, resp) {
  if (err) console.log('error:', resp);
  else console.log(resp);
};

musicBrainz({recording:'Thriller', artist:'Michael Jackson'}, cb);
musicBrainz({recording:'Smooth Criminal', artist:'Michael Jackson'}, cb);
musicBrainz({recording:'Heal the World', artist:'Michael Jackson'}, cb);
