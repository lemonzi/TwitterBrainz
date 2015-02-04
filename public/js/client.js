var socket = io();

function colorify(message, color) {
    var m = "[[;#" + colors[color] + ";#000]" + message + "]";
    console.log(m);
    return m;
}

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

});
