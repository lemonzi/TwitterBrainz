module.exports = [
  {
    query: "Posted a new song:",
    filters: [
    /(?:Posted a new song: ")(.*)(?: - )(.*)(?:" http)/i,
    /(?:Posted a new song: ")(.*)(?:" http.*)()/i
    ]
  },{
    query: "PlayerPro@Android",
    filters: [
    /(?:Escuchando )(.*)(?: de )(.*)(?: - Enviado)/i,
    /(?:Listening to )(.*)(?: by )(.*)(?: - Sent)/i,
    /(?:#NowPlaying ")(.*)(?:" #)(.*)(?: on Player)/i,
    /(?:#NowPlaying )(.*)(?: de )(.*)(?: @.*- Enviado)/i,
    /(?:#NowPlaying )(.*)(?: de )(.*)(?: - Enviado)/i,
    /(?:#NowPlaying )(.*)(?: by )(.*)(?: @.*- Sent from)/i,
    /(?:#NowPlaying )(.*)(?: by )(.*)(?: - Sent from)/i,
    /(?:Ouvindo ")(.*)(?:" por ")(.*)(?:" - Via)/i
    ]
  },{
    query: "MakeAVoice.com/tunein",
    filters: [
    /(?:Radio: Now Playing "?)([^"]*)(?: - )([^"]*)(?:"?\n)/i,
    /(Radio is now playing )(.*)(?: - )(.*)(?:\n)/i,
    /(?:Playing: )(.*)(?: - )(.*)(?:\n)/i,
    /(?:Now Playing )(.*)(?: - )(.*)(?: on )/i
    ]
  },{
    query: "#EverythingThatRocks",
    filters: [
    /(?:Now Playing: )(.*)(?: by )(.*)(?: bit.ly)/i
    ]
  },{
    query: "@doubleTwist",
    filters: [
    /(?:I'm listening to )(.*)(?: by | - | – )(.*)(?: using)/i,
    ]
  },{
    query: "#contrasenarecords",
    filters: [
    /(?:♫\s*#noticias\s*(?:#\S*)?\s+|#Music\s*♫\s*|♫+\s*)([^♫#]*)(?: by | - | – )([^#♫]*)(?:\s*#Music|\s*youtube|\s*♫+)/i,
    /(?:\s*)([^♫#]*)(?: by | - | – )([^#]*\S)(?:\s+#Music|\s+youtube)/i,
    ]
  },{
    query: "Tinysong",
    filters: [
      /(?:Listen to )(.*)(?: singing ")(.*)(?:" he)/i
    ]
  },{
    query: "SoundHound",
    filters: [
      /(?:.*– )?(.*)(?: by )(.*)(?:, from)/i,
      /(?:.*– )?(.*)(?: por parte de )(.*)(?:, de)/i,
      /(?:.*– )?(.*)(?: di )(.*)(?:, da)/i
    ]
  },{
    query: "#Deezer",
    filters: [
      /(?:Descubre )(.*)(?: de )(.*)(?: en| &amp)/i,
      /(?:Discover )(.*)(?: by )(.*)(?: on)/i,
      /(?:Découvrez )(.*)(?: par )(.*)(?: sur| - Deezer)/i,
      /(?:Se joga em )(.*)(?: de )(.*)(?: na)/i
    ]
  },{
    query: "I'm listening to",
    filters: [
      /(?:listening to )(.*)(?: by )([^#]*\S)(?: on @Grooveshark)/i
    ]
  },{
    query: "#SoundCloud",
    filters: [
      /(?:Listen to |A new favorite: )(.*?)(?: by )([^#]*\S)(?: #np on #SoundCloud| http| on #SoundCloud| via #SoundCloud)/i
    ]
  },{
    query: "itunes apple com album",
    filters: [
      /(?:#nowplaying )(.*)(?: by | - | – )([^#]*\S)(?: http)(?:.*)(?:itunes)/i,
      /(?:Purchase )?(?:[\d.]+?\s)(.*\S)(?: - )([^#]*\S)(?:.*\s+.*http\S*)/i,
      /(?:.*iTunes(?:[^a-z]+\s|】))(\S.*) \W ([\w ]*)(?:.*\s+.*http\S*)/i,
      /(\w[\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?:\s*(?:-(?: Single by)?)\s*)([\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?: from)(?:[\s+|.])(?:.*)/i,
      /([\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?:\s*(?:-(?: Single by)?)\s*)([\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?:[\s+|.])(?:.*)/i
    ]
  },{
    query: "#np",
    filters: [
      /(?:#np New Video: )(.*)(?: by | - | – )([^#]*\S)(?: #)/i,
      /(?:#np @.*: \')(.*)(?:\' by )(.*)(?: - http)/i,
      /(?:#np Now playing | #np #nowplaying)(.*)(?: by | - | – )([^#]*)(?:\s.*http)/i,
      /(?:#np : )(.*)(?: - by )(.*?)(?: #Deezer http)/i,
      /(?:#np @?)(.*)(?: by #?| - #?| – #?)(.*?\S)(?:\s+?-? on)/i,
      /(?:#np @?)(.*)(?: by #?| - #?| – #?)(.*?)(?: *[:@]? http| \| )/i
    ]
  },{
    query: "#Now Playing",
    filters: [
      /(?:#Now Playing on .* Radio: )(.*)(?: by | - | – )([^#]*\S)(?: http)/i,
      /(?:#Now Playing )((?:\S-\S|[^-])*)(?:\s+-)?(?:\s+-\s+)([\w\s-'!àèìòùáéíóúäëïöü.]*\w)(?: on WIAG.*)(?:http\S*)/i,
      /(?:#Now Playing )((?:\S-\S|[^-])*)(?:\s+-)?(?:\s+-\s+)([\w\s-'!àèìòùáéíóúäëïöü.]*\w)(?:.*\s+.*http\S*)/i,
      /(?:#Now Playing )((?:\S-\S|[^-])*)(?:\s+-)?(?:\s+-\s+)([\w\s]*\w)(?:.*\s+.*http\S*)/i
    ]
  },{
    query: "#nowplaying",
    filters: [
      /(?:#NowPlaying )(.*)(?: by | - | – | ♪ by )([^#]*\S)( - listen at)/i,
      /(?:#nowplaying on.*: )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?:\s+~ listen now at)/i,
      /(?:#nowplaying @ http[\S]+ )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: tune in now:)/i,
      /(?:")(.*)(?:" track from ".*" album by )([^#]*\S)(?:#nowplaying)/i,
      /(?:Listening to - )(.*)(?: ~~ )([^#]*\S)(?: #nowplaying)/i,
      /(?:=&gt; )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: #nowplaying)/i,
      /(?:#NowPlaying - @)(.*)(?: by #| - #| – #)([^#]*\S)(?: : http)/i,
      /(?:#NowPlaying ")(.*)(?:" by |" - |" – )([^#]*\S)(?: on @| on #| on http| on album)/i,
      /(?:#NowPlaying ")(.*)(?:" by |" - |" – )([^#]*\S)(?: on)/i,
      /(?:#NowPlaying #Music from )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: http)/i,
      /(?:#NowPlaying )(.*)(?: - | – )(?:Tribute to )([^#]*\S)(?:\n)/i,
      /(?:Recomendación de viernes, )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: on http)/i,
      /(?:listening to ')(.*)(?:' by ')([^#]*\S)(?:\s+'.)/i,
      /(?:listening to )(.*)(?: by )([^#]*\S)(?: on @Grooveshark| on ReMoCon| on \(| on Real)/i,
      /(?:listening to )(.*)(?: by )([^#]*\S)(?: http.*#nowplaying)/i,
      /(?:listening to )(.*)(?: by )([^#]*\S)(?: #nowplaying| #)/i, 
      /(?:RT @.*: #NowPlaying )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: on @Grooveshark| on ReMoCon| on \(| is #nowplaying| \| http)/i,
      /(?:RT @.*: #NowPlaying )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: http)/i,
      /(?:RT @.*: )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: on @Grooveshark| on ReMoCon| on \(| is #nowplaying| \| http)/i,
      /(?:RT @.*: )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: http)/i,
      /(?:[\u266A-\u266F]\s)(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: [\u266A-\u266F])(?:.*\s+.*http\S*)/i,
      /(?:♫\s*#NowPlaying )(\S.*)(?: by | - | – | ♪ by )([^#]*\S)(?: on #| on http)/i,
      /(?:♫ |♫|♪ |♪)(\S.*)(?: by | - | – | ♪ by )([^#]*\S)(?: on #| on http)/i,
      /(?:♫ |♫|♪ |♪)(\S.*)(?: by | - | – | ♪ by )([^#]*\S)(?: http\S*)/i,
      /(?:#NowPlaying :: )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: on #| on http| on Music)/i,
      /(?:#NowPlaying :: )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: #| http)/i,
      /(?:#NowPlaying\s*: )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?:\s::)(?:.*\s+.*http\S*)/i,
      /(?:#NowPlaying\s*: )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: \| )/i,
      /(?:#NowPlaying\s*: )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: #.*http| http.*#)/i,
      /(?:#NowPlaying\s*: )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: #| http)/i,
      /(?:#NowPlaying )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?:\s::)(?:.*\s+.*http\S*)/i,
      /(?:#NowPlaying )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: solo por http)/i,
      /(?:#NowPlaying )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: on #| on http| on Music| ~Listen Live At~| on .* Radio| from| EN http)/i,
      /(?:#NowPlaying )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: #| http)/i,
      /(?:NowPlaying \/ )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: http| #)/i,
      /(?:NowPlaying |Now Playing : )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: http.*#nowplaying)/i,
      /(?:NowPlaying |Now Playing : )(.*)(?: by | - | – | ♪ by )([^#]*\S)(?: #nowplaying)/i,
      /(\S.*)(?: by )([^#]*\S)(?: on @Grooveshark| on ReMoCon| on \(| is #nowplaying| #nowplaying on| \: #nowplaying on)/i,
      /(\S.*)(?: - )([^#]*\S)(?: \| http)/i,
      /(\S.*)(?: by | - | – | ♪ by )([^#]*\S)(?: http.*#nowplaying)/i,
      /(\S.*)(?: by | - | – | ♪ by )([^#]*\S)(?: #nowplaying.*http)/i,
      /(\S.*)(?: by | - | – | ♪ by )([^#]*\S)(?: #nowplaying)/i,
      /(\S.*)(?: by | - | – | ♪ by )([^#]*\S)(?: http)/i,
    ]
  }
];
