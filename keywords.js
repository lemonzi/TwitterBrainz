module.exports = [
  {
    query: "itunes apple com album",
    filters: [
      /(?:[\d.]+?\s)(.*\S)(?: - )(.*)(?:.*\s+.*http\S*)/i,
      /(?:.*iTunes(?:[^a-z]+\s|】))(\S.*) \W ([\w ]*)(?:.*\s+.*http\S*)/i,
      /(\w[\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?:\s*(?:-(?: Single by)?)\s*)([\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?: from)(?:[\s+|.])(?:.*)/i,
      /([\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?:\s*(?:-(?: Single by)?)\s*)([\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?:[\s+|.])(?:.*)/i
    ]
  },{
    query: "#Now Playing",
    filters: [
      /(?:#Now Playing )((?:\S-\S|[^-])*)(?:\s+-)?(?:\s+-\s+)([\w\s]*\w)(?:.*\s+.*http\S*)/i
    ]
  },{
    query: "#nowplaying",
    filters: [
      /(?:#NowPlaying )(.*)(?: - | – )(.*\S)(?:\s::)(?:.*\s+.*http\S*)/i,
      /(?:#NowPlaying: )(.*)(?: - | – )(.*\S)(?:\s::)(?:.*\s+.*http\S*)/i,
      /(?:[\u266A-\u266F]?\s)(.*)(?: - | – )(.*\S)(?:[\u266A-\u266F]?\s)(?:.*\s+.*http\S*)/i,
      /(?:[\u266A-\u266F]?\s)(.*\S)(?: – | – )(.*)(?:[\u266A-\u266F]?\s)(?:.*\s+.*http\S*)/i,
      /(?:[\u266A-\u266F]?\s)(.*)(?: - | – )(.*\S)(?:[\u266A-\u266F]?\s)?(?:.*\s+.*http\S*)/i,
      /(?:[\u266A-\u266F]?\s)(.*\S)(?: – | – )(.*)(?:[\u266A-\u266F]?\s)?(?:.*\s+.*http\S*)/i,
      /(?:#NowPlaying )(.*\S)(?: by )(.*)(?: on )(?:.*\s+.*http\S*)/i,
      /(?:: )(.*\S)(?: by )(.*)(?: on )(?:.*\s+.*http\S*)/i,
      /(?:[\u266A-\u266F]?\s)?(.*)(?: by | - | – )(.*)(?:.*\s+.*http\S*)?(?: #nowplaying)/i,
      /(?:#NowPlaying )(.*)(?: - | – )(.*\S)(?:.*\s+.*http\S*)/i,
      /(?:#nowplaying )?(?:[\u266A-\u266F] )?(?:[\u266A-\u266F])?(?:.*~ )(.*)(?: \| )(.*)(?: \|\|\|.*)/i,
      /(?:#NowPlaying )?(?:#NowPlaying: )?(?:[\u266A-\u266F] )?(?:[\u266A-\u266F])?(.*)(?: by | - )(.*)(?: (?:on|http).*)/i,
      /(?:#NowPlaying )?(?:#NowPlaying: )?(?:[\u266A-\u266F] )?(?:[\u266A-\u266F])?(.*)(?: by | - )(.*)(?:[\W]+)(?:.*\s+.*http\S*)/i,
      /(?:[\u266A-\u266F]?\s)?(.*)(?: - | – )(.*\S)(?:[\u266A-\u266F]?\s)?(?:.*\s+.*http\S*)/i,
      /(?:[\u266A-\u266F]?\s)?(.*\S)(?: - | – )(.*)(?:[\u266A-\u266F]?\s)?(?:.*\s+.*http\S*)/i   
    ]
  },{
    query: "#SoundCloud",
    filters: []
  },{
    query: "#GooglePlayMusic",
    filters: []
  },{
    query: "#np",
    filters: []
  },{
    query: "@doubleTwist",
    filters: []
  },{
    query: "#Spotify",
    filters: []
  },{
    query: "@YouTube",
    filters: []
  },{
    query: "#Spotify",
    filters: []
  },{
    query: "#PowerAMP",
    filters: []
  },{
    query: "#EverythingThatRocks",
    filters: []
  },{
    query: "MakeAVoice Radio: Now Playing",
    filters: []
  },{
    query: "New Music Alert",
    filters: []
  },{
    query: "#Soulairium",
    filters: []
  },{
    query: "Check out the song",
    filters: []
  },{
    query: "PlayerPro@Android",
    filters: []
  },{
    query: "Deezer",
    filters: []
  },{
    query: "SoundHound",
    filters: []
  },{
    query: "Posted a new song:",
    filters: []
  },{
    query: "openspotify",
    filters: []
  },{
    query: "I\'m listening to",
    filters: []
  },{
    query: "Enjoy listening to",
    filters: []
  }
];
