// npm packages
const express = require('express');
const ejs = require('ejs');
const http = require('http');
const socketio = require('socket.io');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// require routes
const roomRoute = require('./routes/roomRoute');
const indexRoute = require('./routes/indexRoute');

// setup express
const app = express();

// setup socket io
const server = http.createServer(app);
const io = socketio(server);

// trust proxy 
app.enable("trust proxy");

// setup ejs
app.set("view engine", "ejs");

// setup rate limiter
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 100
});

// setup speed limiter
const speedLimiter = slowDown({
    windowMs: 5 * 60 * 1000, // 5 mins
    delayAfter: 50,
    delayMs: 500
});

// middleware
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(rateLimiter);
app.use(speedLimiter);

// error handler
app.use((error, req, res, next) => {
    res.status(500);
    if(process.env.NODE_ENV == 'production') {
        return res.json({
            error: 'Error Occured 🥞'
        });
    }

    return res.json({
        error: error.stack
    });
});

// routes
app.use('/api/v1/room', roomRoute);
app.use('/', indexRoute);

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