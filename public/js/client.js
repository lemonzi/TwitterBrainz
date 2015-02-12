var socket = io();

jQuery(document).ready(function($) {

    var v = new VIZ();
    var preload = true;
    var realtime = false;

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
        if (prepop) {
            if (!preload) return;
            $("#terminal").terminal().echo("Pre-populating...");
        }
        console.log(twit);
        console.log(acoustics);
        var point = {
            "Tweet": twit.text,
            "User": "@" + twit.username,
            "Hour": twit.date.hour,
            "Weekday": twit.date.day,
            "Month": twit.date.month,
            "Positiveness": acoustics.features.valence,
            "Energy": acoustics.features.arousal,
            "Vocal": acoustics.features.vocal,
            "Artist": acoustics.artist,
            "Song": acoustics.title,
            "Avatar": twit.avatar
        };
        v.addToChart(point);
    });

    // JQuery bindings
    $('#realtime-yes').click(function() {
        updateRealtime(true);
    });
    $('#realtime-no').click(function()  {
       updateRealtime(false);
    });
    $('#console-yes').click(function()  { updateConsole(true);   });
    $('#console-no').click(function()   { updateConsole(false);  });
    $('#clear').click(function() {
        v.clear();
        preload = false;
    });

    function updateRealtime(rt) {
        if (rt == realtime) return;
        realtime = rt;
        socket.emit('realtime', rt);
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
