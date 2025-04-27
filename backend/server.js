const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Correct - serve frontend folder
app.use(express.static(path.join(__dirname, '..', 'frontend')));

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});
