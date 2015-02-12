var NB = require('nodebrainz'),
    request = require('request-json');

// THIS IS FOR MUSICBRAINZ (already glued to acousticbrainz)

var queues = exports.queue = [[]];
var queueNames = {'default': 0};

var nb = new NB({});
var currentQueue = 0;
setInterval(function() {
  var newQueue = currentQueue;
  var queue = queues[newQueue];
  if (queue.length === 0) {
    while (queue.length === 0) {
      newQueue = (newQueue + 1) % queues.length;
      if (newQueue == currentQueue) return;
      queue = queues[newQueue];
    }
  }
  var task = queue.splice(Math.floor(Math.random() * queue.length), 1)[0];
  var query = task.query;
  var mbCallback = task.callback;
  nb.search('recording', query, function(err,resp){
    if (err) {
      mbCallback(true, 'MusicBrainz server error: ' + err.error);
      return;
    }
    var songs = resp.recordings;
    if (!songs || songs.length === 0) {
      mbCallback(true, 'No songs found (queue size: ' + queue.length + ')');
      return;
    }
    // now, query acousticBrainz
    var songCount = 0;
    var abCallback = function(err, resp) {
      if (err) {
        songCount++;
        if (songCount < songs.length)
          exports.acousticBrainz(songs[songCount].id, abCallback);
        else
          mbCallback(true,
            'No acoustic features found (queue size: ' + queue.length + ')'
          );
      } else {
        var title = songs[songCount].title;
        var artist = songs[songCount]['artist-credit'][0].artist.name;
        mbCallback(false, {
          title: title,
          artist: artist,
          features: resp
        });
      }
    };
    exports.acousticBrainz(songs[0].id, abCallback);
    newQueue = (newQueue + 1) % queues.length;
  });
}, 3000);

exports.query = function(query, mbCallback, queue) {
  if (!queue) queue = 'default';
  if (!queueNames[queue]) {
    queueNames[queue] = queues.length;
    queues.push([]);
  }
  if (queues[queueNames[queue]].length < 10000) queues[queueNames[queue]].push({
    query:query,
    callback: mbCallback
  });
  else mbCallback(true, 'MusicBrainz queue is full');
};

// THIS IS FOR ACOUSTICBRAINZ

var acousticBrainzClient = request.newClient('http://acousticbrainz.org/');
exports.acousticBrainz = function(id, callback) {
  acousticBrainzClient.get(id+'/high-level', function(err, res, body) {
    if (res.statusCode == 404) {
      callback(true, 'No acoustic features found');
    } else {
      callback(false, {
        valence: body.highlevel.mood_happy.all.happy,
        arousal: body.highlevel.mood_relaxed.all.not_relaxed,
        vocal: body.highlevel.voice_instrumental.value
      });
    }
  });
};

// DEMOS:

// var printCb = function(err, resp) {
//   if (err) console.error(resp.red);
//   else console.log(resp.green,'\n');
// };

// brainz.query({recording:'Beat it', artist:'Michael Jackson'}, printCb);
// brainz.query({recording:'Smooth Criminal', artist:'Michael Jackson'}, printCb);
// brainz.query({recording:'Heal the World', artist:'Michael Jackson'}, printCb);
// brainz.query({recording:'Eine Kleine Nachtmusic', artist:'Mozart'}, printCb);
// brainz.query({recording:'Invisible kid', artist:'Metallica'}, printCb);
// brainz.query({recording:'Heal the World', artist:'Michael Jackson'}, printCb);
// brainz.query({recording:'All of me', artist:'Jon Schmidt'}, printCb);
// brainz.query({artist:'Michael Jackson',limit:100},printCb);
// brainz.query({recording:'Shake it off', artist:'Taylor Swift'},printCb);
// brainz.query({recording:'Hurt', artist:'Johnny Cash'},printCb);
// brainz.query({recording:'Yesterday', artist:'The beatles'},printCb);
// brainz.query({recording:'I\'m yours', artist:'Jason Mraz'},printCb);
// brainz.query({recording:'Waka waka', artist:'Shakira'},printCb);
