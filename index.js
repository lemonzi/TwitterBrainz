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

/* FOR WHEN WE HAVE THE CLIENT

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

*/

// TEST TWITTER

var parseSong = function(err, twit, filters) {
  if (err) console.error(twit.red);
  var res = null;
  for (var i = 0; i < filters.length; i++) {
    res = filters[i].exec(twit);
    if (res) {
      // console.log(twit, '\n---> FILTER: '.green, [res[1],res[2]]);
      return [res[1],res[2]];
    }
  }
  console.log('Could not match twit: \n'.yellow, twit);
  return null;
};

twitter.getTweets([keywords[2].query], function(err,twit) {
  if (err) {
    console.error(twit.red);
    return;
  }
  var data = parseSong(err, twit.text, keywords[2].filters);
  if (data) {
    brainz.query({
      recording: data[0],
      artist: data[1]
    }, function(err2, acoustic) {
      if (err2) console.error(
        (acoustic + ': \n').red,
        twit.text,
        '\n    ---> FILTER: '.blue, data
      );
      else console.log(
        acoustic.green,
        '\n    ---> FILTER: '.green, data
      );
    });
  }
});

// TEST ACOUSTICBRAINZ

// var printCb = function(err, resp) {
//   if (err) console.error(resp.red);
//   else console.log(resp.green,'\n');
// };

//brainz.query({recording:'Beat it', artist:'Michael Jackson'}, printCb);
//brainz.query({recording:'Smooth Criminal', artist:'Michael Jackson'}, printCb);
//brainz.query({recording:'Heal the World', artist:'Michael Jackson'}, printCb);
//brainz.query({recording:'Eine Kleine Nachtmusic', artist:'Mozart'}, printCb);
//brainz.query({recording:'Invisible kid', artist:'Metallica'}, printCb);
//brainz.query({recording:'Heal the World', artist:'Michael Jackson'}, printCb);
//brainz.query({recording:'All of me', artist:'Jon Schmidt'}, printCb);
//brainz.query({artist:'Michael Jackson',limit:100},printCb);
//brainz.query({recording:'Shake it off', artist:'Taylor Swift'},printCb);
//brainz.query({recording:'Hurt', artist:'Johnny Cash'},printCb);
//brainz.query({recording:'Yesterday', artist:'The beatles'},printCb);
//brainz.query({recording:'I\'m yours', artist:'Jason Mraz'},printCb);
//brainz.query({recording:'Waka waka', artist:'Shakira'},printCb);
