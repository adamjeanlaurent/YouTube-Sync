// npm packages
const express = require('express');
const ejs = require('ejs');
const http = require('http');
const socketio = require('socket.io');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

// routes
const createRoomRoute = require('./routes/roomRoute');

const app = express();

// setup socket io
const server = http.createServer(app);
const io = socketio(server);

// middleware
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use('/api/v1/createRoom', createRoomRoute);


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
