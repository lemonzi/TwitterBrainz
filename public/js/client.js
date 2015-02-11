var socket = io();

jQuery(document).ready(function($) {

    var v = new VIZ();

    $('#terminal').terminal(function(command) {}, {
        enabled: false,
        greetings: "",
        prompt: ""
    });

    socket.on('update', function(data) {
        console.log(data);
        $("#terminal").terminal().echo(data);
    });

    socket.on('tweet', function(twit, acoustics, prepop) {
        console.log(twit);
        console.log(acoustics);
        if (prepop) $("#terminal").terminal().echo("Pre-populating...");
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
        v.addToChart(point);
    });

    socket.on('realtime', updateRealtime);

    // JQuery bindings
    $('#realtime-yes').click(function() {
        socket.emit('realtime', true);
    });
    $('#realtime-no').click(function()  {
        socket.emit('realtime', false)
    });
    $('#console-yes').click(function()  { updateConsole(true);   });
    $('#console-no').click(function()   { updateConsole(false);  });
    $('#clear').click(v.clear);

    function updateRealtime(rt) {
        if (rt) {
            $('#realtime-yes').addClass('selected');
            $('#realtime-no').removeClass('selected');
        } else {
            $('#realtime-yes').removeClass('selected');
            $('#realtime-no').addClass('selected');
        }
    }

    function updateConsole(cn) {
        if (cn) {
            $('#console-yes').addClass('selected');
            $('#console-no').removeClass('selected');
            $('#terminal').removeClass('hidden');
            $('#chart').addClass('hidden');
        } else {
            $('#console-yes').removeClass('selected');
            $('#console-no').addClass('selected');
            $('#terminal').addClass('hidden');
            $('#chart').removeClass('hidden');
        }
    }

});
