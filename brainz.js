var NB = require('nodebrainz'),
    request = require('request-json');

// THIS IS FOR MUSICBRAINZ (already glued to acousticbrainz)

exports.queue = [];

var nb = new NB({});
setInterval(function() {
  if (queue.length === 0) return;
  var task = queue.pop();
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
          tonality: resp
        });
      }
    };
    exports.acousticBrainz(songs[0].id, abCallback);
  });
}, 1000);

exports.query = function(query, mbCallback) {
  if (queue.length < 100000) queue.push({
    query:query,
    callback: mbCallback
  });
  else mbCallback(true, 'MusicBrainz queue is full');
};

// THIS IS FOR ACOUSTICBRAINZ

var acousticBrainzClient = request.newClient('http://acousticbrainz.org/');
exports.acousticBrainz = function(id, callback) {
  acousticBrainzClient.get(id+'/low-level', function(err, res, body) {
    if (res.statusCode == 404) {
      callback(true, 'No acoustic features found');
    } else {
      var key = body.tonal.chords_key;
      var scale = body.tonal.chords_scale;
      callback(false, {key:key, scale:scale});
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
