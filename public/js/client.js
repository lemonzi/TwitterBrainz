var socket = io();

jQuery(document).ready(function($) {

    $('#terminal').terminal(function(command) {}, {
        enabled: false,
        greetings: "",
        prompt: ""
    });

    socket.on('update', function(data) {
        console.log(data);
        $("#terminal").terminal().echo(data);
    });

    socket.on('tweet', function(twit, acoustics) {
        console.log(twit);
        console.log(acoustics);
        var point = {
            "Tweet": twit.text,
            "User": "@" + twit.username,
            "Hour": twit.date.hour,
            "Weekday": twit.date.day,
            "Month": twit.date.month,
            "Tempo": acoustics.features.tempo,
            "Tonality": acoustics.features.key,
            "Mode": acoustics.features.scale,
            "Artist": acoustics.artist,
            "Song": acoustics.title,
            "Avatar": twit.avatar
        };
        addToChart(point);
    });

    init();

});
