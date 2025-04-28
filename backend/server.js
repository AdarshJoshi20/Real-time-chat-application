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
    console.log('Socket ID:', socket.id); // Log the socket ID

    socket.on('disconnect', () => {
        console.log('user disconnected',socket.id);
        
    });

    socket.on('sendMessage', (msg) => {
        console.log('Received message:', msg);
        io.emit('receiveMessage', msg);
    });
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});
