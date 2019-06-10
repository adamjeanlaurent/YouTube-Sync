const express = require('express');
const ejs = require('ejs');
const http = require('http');
const socketio = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));
app.set("view engine", "ejs"); 

// index page with embedded youtube player
app.get('/', (req,res) => {
    res.render('index');
});

// connection event
io.on('connection' , (socket) => {
    console.log('new connection');
    
    // play request
    socket.on('play' , () => {
        io.emit('globalPlay');
    });
    
    // pause request
    socket.on('pause', () => {
        io.emit('globalPause');
    });
    
    // skip request
    socket.on('skip' , (event) => {
        io.emit('globalSkip', event);
    });
    
    // disconnection event
    socket.on('disconnect', () => {
        console.log('A user has disconnected');
    });
});

// port where server resides
server.listen(process.env.PORT || 3000, () => {
    console.log('Running On Port 3000!');
});
