module.exports = [
  { 
    query: "itunes apple com album",
    filters: [
      /(?:.*iTunes(?:[^a-z]+\s|】))(.*) \W ([\w ]*)(?:.*\s+.*http\S*)/i,
      /([\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?:\s*(?:-(?: Single by)?)\s*)([\wàèìòùáéíóúäëïöü'!, ]*[\wàèìòùáéíóúäëïöü'!,])(?:[\s+|.])(?:.*)/i
    ]
  },{
    query: "openspotify",
    filters: []
  },{
    query: "#Now Playing",
    filters: []
  },{
    query: "#nowplaying",
    filters: []
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
  }
];
