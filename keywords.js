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
<<<<<<< HEAD
    /(?:Radio: Now Playing "?)([^"]*)(?: - )([^"]*)(?:"?\n)/i,
    /(?:Radio is now playing )(.*)(?: - )(.*)(?:\n)/i,
    /(?:Playing: )(.*)(?: - )(.*)(?:\n)/i,
    /(?:Now Playing )(.*)(?: - )(.*)(?: on )/i
=======
      named(/(?:Radio: Now Playing "?)(:<song>[^"]*)(?: - )(:<artist>[^"]*)(?:"?\n)/i),
      named(/(Radio is now playing )(:<song>.*)(?: - )(:<artist>.*)(?:\n)/i),
      named(/(?:Playing: )(:<song>.*)(?: - )(:<artist>.*)(?:\n)/i),
      named(/(?:Now Playing )(:<song>.*)(?: - )(:<artist>.*)(?: on )/i)
>>>>>>> Filters
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
    query: "#SoundCloud",
    filters: [
      named(/(?:Listen to |A new favorite: )(:<song>.*?)(?: by )(:<artist>[^#]*\S)(?: #np on #SoundCloud| http.* on #SoundCloud| via #SoundCloud)/i),
      named(/(?:Listen to |A new favorite: )(:<song>.*?)(?: by )(:<artist>[^#]*\S)(?: on #SoundCloud| http)/i)
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
  },{
    query: "#np",
    filters: [
      named(/(?:#np New Video: )(:<song>.*)(?: by | - | – )(:<artist>[^#]*\S)(?: #)/i),
      named(/(?:#np @.*: \')(:<song>.*)(?:\' by )(:<artist>.*)(?: - http)/i),
      named(/(?:#np Now playing | #np #nowplaying)(:<song>.*)(?: by | - | – )(:<artist>[^#]*)(?:\s.*http)/i),
      named(/(?:#np : )(:<song>.*)(?: - by )(:<artist>.*?)(?: #Deezer http)/i),
      named(/(?:#np @?)(:<song>.*)(?: by #?| - #?| – #?)(:<artist>.*?\S)(?:\s+?-? on)/i),
      named(/(?:#np @?)(:<song>.*)(?: by #?| - #?| – #?)(:<artist>.*?)(?: *[:@]? http| \| )/i)
    ]
  },{
    query: "#Now Playing",
    filters: [
      named(/(?:#Now Playing on .* Radio: )(:<song>.*)(?: by | - | – )([^#]*\S)(?: http)/i),
      named(/(?:#Now Playing )(:<artist>(?:\S-\S|[^-])*)(?:\s+-)?(?:\s+-\s+)(:<song>[\w\s-'!àèìòùáéíóúäëïöü.]*\w)(?: on WIAG.*)(?:http\S*)/i),
      named(/(?:#Now Playing )(:<artist>(?:\S-\S|[^-])*)(?:\s+-)?(?:\s+-\s+)(:<song>[\w\s-'!àèìòùáéíóúäëïöü.]*\w)(?:.*\s+.*http\S*)/i),
      named(/(?:#Now Playing )(:<artist>(?:\S-\S|[^-])*)(?:\s+-)?(?:\s+-\s+)(:<song>[\w\s]*\w)(?:.*\s+.*http\S*)/i)
    ]
  },{
    query: "#nowplaying",
    filters: [
      named(/(?:#NowPlaying )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)( - listen at)/i),
      named(/(?:#nowplaying on.*: )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?:\s+~ listen now at)/i),
      named(/(?:#nowplaying @ http[\S]+ )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: tune in now:)/i),
      named(/(?:")(:<song>.*)(?:" track from ".*" album by )(:<artist>[^#]*\S)(?:#nowplaying)/i),
      named(/(?:Listening to - )(:<song>.*)(?: ~~ )(:<artist>[^#]*\S)(?: #nowplaying)/i),
      named(/(?:=&gt; )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: #nowplaying)/i),
      named(/(?:#NowPlaying - @)(:<song>.*)(?: by #| - #| – #)(:<artist>[^#]*\S)(?: : http)/i),
      named(/(?:#NowPlaying ")(:<song>.*)(?:" by |" - |" – )(:<artist>[^#]*\S)(?: on @| on #| on http| on album)/i),
      named(/(?:#NowPlaying ")(:<song>.*)(?:" by |" - |" – )(:<artist>[^#]*\S)(?: on)/i),
      named(/(?:#NowPlaying #Music from )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: http)/i),
      named(/(?:#NowPlaying )(:<song>.*)(?: - | – )(?:Tribute to )(:<artist>[^#]*\S)(?:\n)/i),
      named(/(?:Recomendación de viernes, )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: on http)/i),
      named(/(?:listening to ')(:<song>.*)(?:' by ')(:<artist>[^#]*\S)(?:\s+'.)/i),
      named(/(?:listening to )(:<song>.*)(?: by )(:<artist>[^#]*\S)(?: on @Grooveshark| on ReMoCon| on \(| on Real)/i),
      named(/(?:listening to )(:<song>.*)(?: by )(:<artist>[^#]*\S)(?: http.*#nowplaying)/i),
      named(/(?:listening to )(:<song>.*)(?: by )(:<artist>[^#]*\S)(?: #nowplaying| #)/i),
      named(/(?:RT @.*: #NowPlaying )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: on @Grooveshark| on ReMoCon| on \(| is #nowplaying| \| http)/i),
      named(/(?:RT @.*: #NowPlaying )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: http)/i),
      named(/(?:RT @.*: )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: on @Grooveshark| on ReMoCon| on \(| is #nowplaying| \| http)/i),
      named(/(?:RT @.*: )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: http)/i),
      named(/(?:[\u266A-\u266F]\s)(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: [\u266A-\u266F])(?:.*\s+.*http\S*)/i),
      named(/(?:♫\s*#NowPlaying )(:<song>\S.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: on #| on http)/i),
      named(/(?:♫ |♫|♪ |♪)(:<song>\S.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: on #| on http)/i),
      named(/(?:♫ |♫|♪ |♪)(:<song>\S.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: http\S*)/i),
      named(/(?:#NowPlaying :: )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: on #| on http| on Music)/i),
      named(/(?:#NowPlaying :: )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: #| http)/i),
      named(/(?:#NowPlaying\s*: )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?:\s::)(?:.*\s+.*http\S*)/i),
      named(/(?:#NowPlaying\s*: )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: \| )/i),
      named(/(?:#NowPlaying\s*: )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: #.*http| http.*#)/i),
      named(/(?:#NowPlaying\s*: )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: #| http)/i),
      named(/(?:#NowPlaying )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?:\s::)(?:.*\s+.*http\S*)/i),
      named(/(?:#NowPlaying )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: solo por http)/i),
      named(/(?:#NowPlaying )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: on #| on http| on Music| ~Listen Live At~| on .* Radio| from| EN http)/i),
      named(/(?:#NowPlaying )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: #| http)/i),
      named(/(?:NowPlaying \/ )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: http| #)/i),
      named(/(?:NowPlaying |Now Playing : )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: http.*#nowplaying)/i),
      named(/(?:NowPlaying |Now Playing : )(:<song>.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: #nowplaying)/i),
      named(/(:<song>\S.*)(?: by )(:<artist>[^#]*\S)(?: on @Grooveshark| on ReMoCon| on \(| is #nowplaying| #nowplaying on| \: #nowplaying on)/i),
      named(/(:<song>\S.*)(?: - )(:<artist>[^#]*\S)(?: \| http)/i),
      named(/(:<song>\S.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: http.*#nowplaying)/i),
      named(/(:<song>\S.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: #nowplaying.*http)/i),
      named(/(:<song>\S.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: #nowplaying)/i),
      named(/(:<song>\S.*)(?: by | - | – | ♪ by )(:<artist>[^#]*\S)(?: http)/i),
    ]
  }
];
