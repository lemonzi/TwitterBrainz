var express = require('express'),
    colors = require('colors'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    utils = require('./utils.js'),
    brainz = require('./brainz.js'),
    twitter = require('./twitter.js'),
    keywords = require('./keywords.js');

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

io.sockets.on('connection', function (socket) {
    // Send the Tweets to the browser as they come in
    twitter.getTweets({track: ['nashville']}, function(err, resp) {
      io.sockets.emit('stream', utils.linkify(resp.text), resp.username, resp.avatar);
    });
});

server.listen(process.env.PORT || 8080);

var parseSong = function(err, twit, filters) {
  if (err) console.log(twit.red);
  var res = null;
  for (var i = 0; i < filters.length; i++) {
    res = filters[i].exec(twit);
    if (res) return [res[1],res[2]];
  }
  // console.log('Could not match twit: \n'.yellow, twit);
  return null;
};

var runBackend = function(keyword) {
  twitter.getTweets([keyword.query], function(err,twit) {
    if (err) {
      console.log(twit.red);
      return;
    }
    var data = parseSong(err, twit.text, keyword.filters);
    if (data) {
      brainz.query({
        recording: data[0],
        artist: data[1]
      }, function(err2, acoustic) {
        if (err2) console.log(
          acoustic.red, '\n',
          twit.text, '\n',
          '    ---> FILTER: '.blue, data
        );
        else console.log(
          JSON.stringify(acoustic).green, '\n',
          twit.text, '\n',
          '    ---> FILTER: '.green, data
        );
      });
    }
  });
};

runBackend(keywords[0]);
runBackend(keywords[1]);
runBackend(keywords[2]);
