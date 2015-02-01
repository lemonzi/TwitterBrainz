var NB = require('nodebrainz'),
    request = require('request-json');

// THIS IS FOR MUSICBRAINZ (already glued to acousticbrainz)

var nb = new NB({});
exports.query = function(query, mbCallback) {
  nb.search('recording', query, function(err,resp){
    if (err) {
      mbCallback(true, 'MusicBrainz server error: ' + err.error);
      return;
    }
    var songs = resp.recordings;
    if (!songs || songs.length === 0) {
      mbCallback(true, 'No songs found');
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
    exports.acousticBrainz(songs[0].id, abCallback);
  });
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
