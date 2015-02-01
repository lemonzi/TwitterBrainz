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
  // Say hi
});

server.listen(process.env.PORT || 8080);

var parseSong = function(twit, filters) {
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
    var data = parseSong(twit.text, keyword.filters);
    if (data) {
      brainz.query({
        recording: data[0],
        artist: data[1]
      }, function(err2, acoustic) {
        if (err2) console.log(
          acoustic.red, '\n',
          twit.text, '\n',
          '    ---> FILTER: '.magenta, data
        );
        else console.log(
          'SONG FOUND:\n'.green,
          JSON.stringify(acoustic).green, '\n',
          twit.text, '\n',
          '    ---> FILTER: '.green, data
        );
      });
    }
  });
};

keywords.forEach(function(keyword) {
  if (keyword.filters.length > 0)
    runBackend(keyword);
});

// This is where the magic happens
old_log = console.log;
console.log = function() {
  var out = "";
  for (var i = 0; i < arguments.length; i++) {
    out += arguments[i];
  }
  io.sockets.emit('update', out);
  old_log.apply(console,arguments);
};