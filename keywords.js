named = require('named-regexp').named;

module.exports = [
  {
    query: "Posted a new song:",
    filters: [
      named(/(?:Posted a new song: ")(:<song>.*)(?: - )(:<artist>.*)(?:" http)/i),
      named(/(?:Posted a new song: ")(:<song>.*)(?:" http.*)(:<artist>)/i)
    ]
  },{
    query: "PlayerPro@Android",
    filters: [
      named(/(?:Escuchando )(:<song>.*)(?: de )(:<artist>.*)(?: - Enviado)/i),
      named(/(?:Listening to )(:<song>.*)(?: by )(:<artist>.*)(?: - Sent)/i),
      named(/(?:#NowPlaying ")(:<song>.*)(?:" #)(:<artist>.*)(?: on Player)/i),
      named(/(?:#NowPlaying )(:<song>.*)(?: de )(:<artist>.*)(?: @.*- Enviado)/i),
      named(/(?:#NowPlaying )(:<song>.*)(?: de )(:<artist>.*)(?: - Enviado)/i),
      named(/(?:#NowPlaying )(:<song>.*)(?: by )(:<artist>.*)(?: @.*- Sent from)/i),
      named(/(?:#NowPlaying )(:<song>.*)(?: by )(:<artist>.*)(?: - Sent from)/i),
      named(/(?:Ouvindo ")(:<song>.*)(?:" por ")(:<artist>.*)(?:" - Via)/i)
    ]
  },{
    query: "MakeAVoice com tunein",
    filters: [
      named(/(?:Radio: Now Playing "?)(:<song>[^"]*)(?: - )(:<artist>[^"]*)(?:"?\n)/i),
      named(/(Radio is now playing )(:<song>.*)(?: - )(:<artist>.*)(?:\n)/i),
      named(/(?:Playing: )(:<song>.*)(?: - )(:<artist>.*)(?:\n)/i),
      named(/(?:Now Playing )(:<song>.*)(?: - )(:<artist>.*)(?: on )/i)
    ]
  },{
    query: "#EverythingThatRocks",
    filters: [
      named(/(?:Now Playing: )(:<song>.*)(?: by )(:<artist>.*)(?: bit.ly)/i)
    ]
  },{
    query: "@doubleTwist",
    filters: [
      named(/(?:I'm listening to )(:<song>.*)(?: by | - | – )(:<artist>.*)(?: using)/i),
    ]
  },{
    query: "#contrasenarecords",
    filters: [
      named(/(?:♫\s*#noticias\s*(?:#\S*)?\s+|#Music\s*♫\s*|♫+\s*)(:<song>[^♫#]*)(?: by | - | – )(:<artist>[^#♫]*)(?:\s*#Music|\s*youtube|\s*♫+)/i),
      named(/(?:\s*)(:<song>[^♫#]*)(?: by | - | – )(:<artist>[^#]*\S)(?:\s+#Music|\s+youtube)/i),
    ]
  },{
    query: "Tinysong",
    filters: [
      named(/(?:Listen to )(:<song>.*)(?: singing ")(:<artist>.*)(?:" he)/i)
    ]
  },{
    query: "SoundHound",
    filters: [
      named(/(?:.*– )?(:<song>.*)(?: by )(:<artist>.*)(?:, from)/i),
      named(/(?:.*– )?(:<song>.*)(?: por parte de )(:<artist>.*)(?:, de)/i),
      named(/(?:.*– )?(:<song>.*)(?: di )(:<artist>.*)(?:, da)/i)
    ]
  },{
    query: "#Deezer",
    filters: [
      named(/(?:Descubre )(:<song>.*)(?: de )(:<artist>.*)(?: en| &amp)/i),
      named(/(?:Discover )(:<song>.*)(?: by )(:<artist>.*)(?: on)/i),
      named(/(?:Découvrez )(:<song>.*)(?: par )(:<artist>.*)(?: sur| - Deezer)/i),
      named(/(?:Se joga em )(:<song>.*)(?: de )(:<artist>.*)(?: na)/i)
    ]
  },{
    query: "I'm listening to",
    filters: [
      named(/(?:listening to )(:<song>.*)(?: by )(:<artist>[^#]*\S)(?: on @Grooveshark)/i)
    ]
  },{
    query: "itunes apple com album",
    filters: [
      named(/(?:#nowplaying )(:<song>.*)(?: by | - | – )(:<artist>[^#]*\S)(?: http)(?:.*)(?:itunes)/i),
      named(/(?:Purchase )?(?:[\d.]+?\s)(:<song>.*\S)(?: - )(:<artist>[^#]*\S)(?:.*\s+.*http\S*)/i),
      named(/(?:.*iTunes(?:[^a-z]+\s|】))(:<song>\S.*) \W (:<artist>[\w ]*)(?:.*\s+.*http\S*)/i),
      named(/(:<song>\w[\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?:\s*(?:-(?: Single by)?)\s*)(:<artist>[\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?: from)(?:[\s+|.])(?:.*)/i),
      named(/(:<song>[\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?:\s*(?:-(?: Single by)?)\s*)(:<artist>[\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?:[\s+|.])(?:.*)/i)
    ]
  }
];
