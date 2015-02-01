var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    utils = require('./utils.js'),
    backend = require('./backend.js');

// server.listen(process.env.PORT || 8080);

/* FOR WHEN WE HAVE THE CLIENT

io.sockets.on('connection', function (socket) {
    // Send the Tweet to the browser
    getTweets({track: ['nashville']}, function(err, resp) {
      io.sockets.emit('stream', utils.linkify(resp.text), resp.username, resp.avatar);
    });
});

*/

// TEST TWITTER

var cbTwtr = function(err, resp) {
  if (err) console.log('error:', resp);
  else if (resp.location) console.log(resp.text);
};

var keywords = require('./keywords.json');

//backend.getTweets(keywords.join(' OR '), 1000, cbTwtr);
backend.getTweetsRealtime(keywords, cbTwtr);

// TEST ACOUSTICBRAINZ

var cb = function(err, resp) {
  if (err) console.log('error:', resp);
  else console.log(resp);
};

//backend.musicBrainz({recording:'Beat it', artist:'Michael Jackson'}, cb);
//backend.musicBrainz({recording:'Smooth Criminal', artist:'Michael Jackson'}, cb);
//backend.musicBrainz({recording:'Heal the World', artist:'Michael Jackson'}, cb);
//backend.musicBrainz({recording:'Eine Kleine Nachtmusic', artist:'Mozart'}, cb);
//backend.musicBrainz({recording:'Invisible kid', artist:'Metallica'}, cb);
//backend.musicBrainz({recording:'Heal the World', artist:'Michael Jackson'}, cb);
//backend.musicBrainz({recording:'All of me', artist:'Jon Schmidt'}, cb);
//backend.musicBrainz({artist:'Michael Jackson',limit:100},cb);
//backend.musicBrainz({recording:'Shake it off', artist:'Taylor Swift'},cb);
//backend.musicBrainz({recording:'Hurt', artist:'Johnny Cash'},cb);
