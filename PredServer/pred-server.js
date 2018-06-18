// var express = require('express');
// var app = express();
// var server = require('http').Server(app);
// var socketio = require('socket.io');
// var io = socketio().listen(server);

var express = require('express');
var http = require('http');
var app = express();

var server = module.exports = http.createServer(app);
var io = require("socket.io").listen(server);

var connected = [];
var log_bets = [];

io.on('connection', (socket) => {

    console.log("Client connected: " + socket.handshake.address + ".");

    socket.on('connected', data => {
        connected.push(data.user);
        io.emit('admin', connected);
    })

    socket.on('disconnected', data => {
        connected.pop(data.user);
        io.emit('admin', connected);
    })

    socket.on('disconnect', data => {
        connected.pop(data.user);
        io.emit('admin', connected);
    })
    
    socket.on('msg', data => {
        io.emit('msg', data);
    });

    socket.on('log_bets', data => {
        log_bets.push(data);
        io.emit('log_bets', log_bets)
    })
});

var port = process.env.PORT || 3001;

server.listen(port, function() {
    console.log("Listening on: " + port);
});

