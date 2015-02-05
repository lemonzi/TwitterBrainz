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

});
