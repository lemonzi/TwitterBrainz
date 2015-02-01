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

var parseSong = function(err, resp, filters) {
  if (err) console.log('Error:', resp);
  var res = null;
  for (var i = 0; i < filters.length; i++) {
    res = filters[i].exec(resp.text);
    if (res) {
      console.log(resp.text,"\n--> FILTER: ",[res[1],res[2]],'\n\n');
      return [res[1],res[2]];
    }
  }
  console.log("Could not match twit: \n", resp.text, '\n\n');
  return null;  
}

filters = [
  
]

var cbTwtr = function(err, resp) {
  if (err) console.log('Error: ', resp);
  else console.log(resp.text);
};

var keywords = require('./keywords.js');

//backend.getTweets([keywords[0].query], 100, function(err,resp) {
  // parseSong(err, resp, keywords[0].filters);
//});
backend.getTweetsRealtime([keywords[0].query], function(err,resp) {
  parseSong(err, resp, keywords[0].filters);
});

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
//backend.musicBrainz({recording:'Yesterday', artist:'The beatles'},cb);
//backend.musicBrainz({recording:'I\'m yours', artist:'Jason Mraz'},cb);
//backend.musicBrainz({recording:'Waka waka', artist:'Shakira'},cb);
