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

// Init webserver

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.on('realtime', function(realtime) {
    twitter.realtime = !! realtime;
  });
  socket.on('flush', function() {
    brainz.queue.length = 0;
  });
});

server.listen(process.env.PORT || 8080);

// Main functions

var parseSong = function(twit, keywords) {
  if (twit.toLowerCase().indexOf("mariahcarey") >= 0) return null;
  for (var j = 0; j < keywords.length; j++) {
    var k = keywords[j];
    if (twit.toLowerCase().indexOf(k.query.toLowerCase()) < 0)
      continue;
    var res = null;
    for (var i = 0; i < k.filters.length; i++) {
      res = k.filters[i].exec(twit);
      if (res) return [res[1],res[2]];
    }
  }
  // console.log('Could not match twit: \n'.yellow, twit);
  return null;
};

var runBackend = function(keywords) {
  var queries = keywords.map(function(k) {return k.query;});
  twitter.getTweets(queries, function(err,twit) {
    if (err) {
      console.log(twit.red);
      return;
    }
    var data = parseSong(twit.text, keywords);
    if (data) {
      brainz.query({
        recording: data[0],
        artist: data[1]
      }, function(err2, acoustic) {
        if (err2) console.log(
          acoustic.red, '\n',
          twit.text, '\n',
          '    ---> FILTER: '.magenta, JSON.stringify(data).yellow
        );
        // if (err2) return;
        else {
          console.log(
            'SONG FOUND:\n'.green,
            JSON.stringify(acoustic).green, '\n',
            twit.text, '\n',
            '    ---> FILTER: '.magenta, JSON.stringify(data).yellow
          );
          io.sockets.emit('tweet', twit, acoustic);
        }
      });
    }
  });
};

// Start backend

brainz.interval = 3;
twitter.realtime = false;
twitter.count = 30;
var active_keywords = keywords.filter(function(k) {
  return k.filters.length > 0;
});
twitter.interval = active_keywords.length * 15;
runBackend(active_keywords);


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
