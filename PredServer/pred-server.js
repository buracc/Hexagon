var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io');
var io = socketio().listen(server);

io.on('connection', function(socket) {

    console.log("Client connected with id: " + socket.id + ".");

    socket.on('disconnect', function() {
        io.emit("Client " + socket.id + " has disconnected.");
    });

    socket.on('Message', function(data) {
        io.emit('Message', data);
    });
});

var port = process.env.PORT || 3001;

server.listen(port, function() {
    console.log("Listening on: " + port);
})
