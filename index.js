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

var history = [];

app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(__dirname+'/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.on('realtime', function(rt) {
    if (rt) socket.leave('search');
    else socket.join('search');
  })
  socket.on('flush', function() {
    brainz.queues.forEach(function(q){q.length = 0});
  });
  socket.join('realtime');
  socket.join('search');
  history.forEach(function(t,i) {
    setTimeout(function() {
      socket.emit('tweet', t[0], t[1], true);
    }, i*200);
  });
});

server.listen(process.env.PORT || 8080);

// Main functions

var parseSong = function(twit, keywords) {
  // if (twit.toLowerCase().indexOf("mariahcarey") >= 0) return null;
  for (var j = 0; j < keywords.length; j++) {
    var k = keywords[j];
    if (twit.toLowerCase().indexOf(k.query.toLowerCase()) < 0)
      continue;
    var res = null;
    for (var i = 0; i < k.filters.length; i++) {
      res = k.filters[i].exec(twit);
      if (res) return [res.capture('song'),res.capture('artist')];
    }
  }
  // console.log('Could not match twit: \n'.yellow, twit);
  return null;
};

var runBackend = function(keywords) {
  var queries = keywords.map(function(k) {return k.query;});
  var callback = function(err, twit, room) {
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
          twit.time.format('HH:mm').red, '\n',
          '    ---> FILTER: '.magenta, JSON.stringify(data).yellow
        );
        // if (err2) return;
        else {
          console.log(
            'SONG FOUND:\n'.green,
            JSON.stringify(acoustic).green, '\n',
            twit.text, '\n',
            twit.time.format('HH:mm').green, '\n',
            '    ---> FILTER: '.magenta, JSON.stringify(data).yellow
          );
          twit.date = {
            hour: twit.time.hour() + twit.time.minute() / 60,
            day: twit.time.format('ddd'),
            month: twit.time.format('MMM')
          };
          io.to(room).emit('tweet', twit, acoustic);
          history.push([twit, acoustic]);
          if (history.length > 1000) history.shift();
        }
      }, room);
    }
  };
  twitter.getTweets(queries, function(e,t){callback(e,t,'search');});
  twitter.getTweetsRealtime(queries, function(e,t){callback(e,t,'realtime');});
};

// Start backend

brainz.interval = 1.5;
twitter.count = 100;
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
