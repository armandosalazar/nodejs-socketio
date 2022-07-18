const express = require('express');

const app = express();

// setttigs
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(__dirname + '/public'));

// start server
const server = app.listen(app.get('port'), '192.168.0.11', () => {
    console.log('server on port', app.get('port'));
});

// websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);
    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    });
    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
    socket.on('chat:notyping', () => {
        socket.broadcast.emit('chat:notyping');
    });
});
