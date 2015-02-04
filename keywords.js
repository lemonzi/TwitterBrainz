module.exports = [
  {
    query: "I\'m listening to",
    filters: [
      /(?:I'm listening to (?:.*?["'‘])?)([^"'‘]*?)(?:["'‘]? by ["'‘]?)([^'"‘]*?[^\s'"‘])(?:['"‘.]+| *http)/i
    ]
  },{
    query: "#SoundCloud",
    filters: [
      /(?:Listen to |A new favorite: )(.*?)(?: by )(.*?)(?: #np on #SoundCloud| http| on #SoundCloud| via #SoundCloud)/i
    ]
  },{
    query: "itunes apple com album",
    filters: [
      /(?:Purchase )?(?:[\d.]+?\s)(.*\S)(?: - )(.*)(?:.*\s+.*http\S*)/i,
      /(?:.*iTunes(?:[^a-z]+\s|】))(\S.*) \W ([\w ]*)(?:.*\s+.*http\S*)/i,
      /(\w[\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?:\s*(?:-(?: Single by)?)\s*)([\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?: from)(?:[\s+|.])(?:.*)/i,
      /([\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?:\s*(?:-(?: Single by)?)\s*)([\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?:[\s+|.])(?:.*)/i
    ]
  },{
    query: "#np",
    filters: [
      /(?:#np )(.*)(?: - )(.*?)(?: *[:@]? http)/i
    ]
  },{
    query: "#Now Playing",
    filters: [
      /(?:#Now Playing )((?:\S-\S|[^-])*)(?:\s+-)?(?:\s+-\s+)([\w\s-'!àèìòùáéíóúäëïöü.]*\w)(?:.*\s+.*http\S*)/i,
      /(?:#Now Playing )((?:\S-\S|[^-])*)(?:\s+-)?(?:\s+-\s+)([\w\s]*\w)(?:.*\s+.*http\S*)/i
    ]
  },{
    query: "#nowplaying",
    filters: [
      /(?:[\u266A-\u266F]\s)(.*)(?: by | - | – )(.*\S)(?: [\u266A-\u266F])(?:.*\s+.*http\S*)/i,
      /(?:#nowplaying )?(?:[\u266A-\u266F]?\s)?“?([^“”]*)”?(?: by | - | – )(.*?)(?:[\u266A-\u266F]\s)?(?:\s+http\S*)?(?: #nowplaying)/i,
      /(?:#nowplaying )?(?:[\u266A-\u266F] )?(?:[\u266A-\u266F])?(?:.*~ )(.*)(?: \| )(.*)(?: \|\|\|.*)/i,
      /(?:#NowPlaying )(.*)(?: by | - | – )(.*\S)(?:\s::)(?:.*\s+.*http\S*)/i,
      /(?:#NowPlaying: )(.*)(?: by | - | – )(.*\S)(?:\s::)(?:.*\s+.*http\S*)/i,
      /(?:[\u266A-\u266F]\s)?(.*\S)(?: by | - | – )(.*)(?:[\u266A-\u266F]\s)?(?:.*\s+.*http\S*)/i,
      /(?:[\u266A-\u266F]\s)?(.*)(?: by | - | – )(.*\S)(?:[\u266A-\u266F]\s)?(?:.*\s+.*http\S*)/i,
      /(?:[\u266A-\u266F]\s)?(.*\S)(?: by | - | – )(.*)(?:[\u266A-\u266F]\s)?(?:.*\s+.*http\S*)/i,
      /(?:#NowPlaying )(.*\S)(?: by | - | – )(.*)(?: on )(?:.*\s+.*http\S*)/i,
      /(?:: )(.*\S)(?: by | - | – )(.*)(?: on )(?:.*\s+.*http\S*)/i,
      /(?:#NowPlaying )([^-]*)(?: by | - | – )([^-^–]*[^-^–\s])(?:.*\s+.*http\S*)/i,
      /(?:#NowPlaying )(.*)(?: by | - | – )(.*\S)(?:.*\s+.*http\S*)/i,
      /(?:#NowPlaying )?(?:#NowPlaying: )?(?:[\u266A-\u266F] )?(?:[\u266A-\u266F])?(.*)(?: by | - | – )(.*)(?: (?:on|http).*)/i,
      /(?:#NowPlaying )?(?:#NowPlaying: )?(?:[\u266A-\u266F] )?(?:[\u266A-\u266F])?(.*)(?: by | - | – )(.*)(?:[\W]+)(?:.*\s+.*http\S*)/i,
      /(?:[\u266A-\u266F]\s)?(.*)(?: by | - | – )(.*\S)(?:[\u266A-\u266F]?\s)?(?:.*\s+.*http\S*)/i,
      /(?:[\u266A-\u266F]\s)?(.*\S)(?: by | - | – )(.*)(?:[\u266A-\u266F]?\s)?(?:.*\s+.*http\S*)/i
    ]
  },{
    query: "#GooglePlayMusic",
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
    query: "Enjoy listening to",
    filters: []
  }
];
