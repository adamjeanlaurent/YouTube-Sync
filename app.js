const express = require('express');
const ejs = require('ejs');
const http = require('http');
const socketio = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static('public'));
app.set("view engine", "ejs"); 


app.get('/', (req,res) => {
    res.render('index');
});

io.on('connection' , (socket) => {
    console.log('new connection');
    socket.on('play' , () => {
        io.emit('globalPlay');
    });
    socket.on('pause', () => {
        io.emit('globalPause');
    });
    socket.on('skip' , (event) => {
        io.emit('globalSkip', event);
    });
});

server.listen(3000, () => {
    console.log('Running On Port 3000!');
});