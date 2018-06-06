var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io');
var io = socketio().listen(server);

io.on('connection', function (socket) {

    connected.push(socket.handshake.address);
    console.log("Client connected: " + socket.handshake.address + ".");

    socket.on('msg', data => {
        io.emit('msg', data);
    });
});

var port = process.env.PORT || 3001;

server.listen(port, function () {
    console.log("Listening on: " + port);
})
