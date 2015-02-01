module.exports = [
  {
    query: "itunes apple com album",
    filters: [
      /(?:.*iTunes(?:[^a-z]+\s|】))(\S.*) \W ([\w ]*)(?:.*\s+.*http\S*)/i,
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
      /(?:#NowPlaying )?(?:#NowPlaying: )?(?:[\u266A-\u266F])?(.*)(?: by )(.*)(?: (?:on|http).*)/i,
      /(?:#NowPlaying )?(?:#NowPlaying: )?(?:[\u266A-\u266F])?(.*)(?: - )(.*)(?: (?:on|http).*)/i,
      /(?:#NowPlaying )?(?:#NowPlaying: )?(?:[\u266A-\u266F])?(.*)(?: - )(.*\S)(?:\s::)(?:.*\s+.*http\S*)/i,
      /(?:#NowPlaying )?(?:#NowPlaying: )?(?:[\u266A-\u266F])?(.*)(?: - )(.*)(?:[\W]+)(?:.*\s+.*http\S*)/i,
      /(?:[\u266A-\u266F])?(?:[\u266A-\u266F] )?(.*)(?: - )(.*\S)(?:.*\s+.*http\S*)/i,
      /(?:[\u266A-\u266F])?(?:[\u266A-\u266F] )?(.*\S)(?: – )(.*)(?:.*\s+.*http\S*)/i,
      /(?:#nowplaying )?(?:[\u266A-\u266F])?(?:[\u266A-\u266F] )?(?:.*~ )(.*)(?: \| )(.*)(?: \|\|\|.*)/i,
      /(?:[\u266A-\u266F])?(?:[\u266A-\u266F] )?(.*)(?: by )(.*)(?: #nowplaying)/i
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
