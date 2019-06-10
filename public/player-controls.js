// socket.io library functions
const socket = io();

// elements
const playButton = document.querySelector('#playButton');
const pauseButton = document.querySelector('#pauseButton');
const progressBar = document.querySelector("#progress-bar");
const progressDot = document.querySelector('#dot');

// global variables for prgoress bar time interval
let progressBarLoop;
let isRunning = false;

// moves the dot along the progress bar as the video plays
function barMovement(){
    if(player.getCurrentTime && player.getDuration){
        
    // the percentage of the bar that the dot should move
    let fraction = (player.getCurrentTime()/player.getDuration())*100;
        
    // moves the dot across the bar 
    progressDot.style.left = fraction.toString() + '%';
    }
}

// ----SOCKET LISTENERS----

// plays video for all connections
socket.on('globalPlay', () => { 
    if(!isRunning && player.playVideo){
        player.playVideo();
        isRunning = true;
        
        // restart progress bar interval
        progressBarLoop = setInterval(barMovement,200);
    }
});

// pauses all connections
socket.on('globalPause', () => {
    if(isRunning && player){  
        player.pauseVideo();
        
        // end progress bar interval
        clearInterval(progressBarLoop);
        isRunning = false;
    }
});

// ----EVENT LISTENERS----

// play video button
playButton.addEventListener('click', () => {
    socket.emit('play');
});

// pause player button
pauseButton.addEventListener('click', () => {
    socket.emit('pause');
});

// progress bar
progressBar.addEventListener('click', (event) => {
    // clientX is where the user clicked on the progress bar in order to skip
    socket.emit('skip', event.clientX);
});

socket.on('globalSkip', (event) => {   
    let clickScreenX = event;
    
    // where the box currently is
    let currentBoxLeft = progressDot.offsetLeft;

    // skipping forwards
    if (currentBoxLeft < clickScreenX) {
        if (clickScreenX < 690) {
            progressDot.style.left = clickScreenX - 50 + 'px';
        }
    } 
    
    // skipping backwards
    else if (currentBoxLeft > clickScreenX) {
        progressDot.style.left = clickScreenX - 50 + 'px';
    }
    
    // percentage of the bar to move the dot
    let fraction = ((clickScreenX - 50)/640);
    player.seekTo(player.getDuration() * fraction);
});
