const socket = io();

const playButton = document.querySelector('#playButton');
const pauseButton = document.querySelector('#pauseButton');
const progressBar = document.querySelector("#progress-bar");
const progressDot = document.querySelector('#dot');

// progress bar loop

let progressBarLoop;
let isRunning = false;

function barMovement(){
    if(player.getCurrentTime && player.getDuration){
    // the percentage of the bar that the dot should move
    let fraction = (player.getCurrentTime()/player.getDuration())*100;
    // moves the dot across the bar 
    progressDot.style.left = fraction.toString() + '%';
    // Stops dot from moving if the video is over
    // if(fraction === 100){
    //     clearInterval(progressBarLoop);
    // }
    }
}

// ----SOCKET LISTENERS----

// plays all connections
socket.on('globalPlay', () => { 
    if(!isRunning && player.playVideo){
        console.log('PLAY REQUEST');
        player.playVideo();
        isRunning = true;
        progressBarLoop = setInterval(barMovement,200);
    }
});

// pauses all connections
socket.on('globalPause', () => {
    if(isRunning && player){  
        player.pauseVideo();
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
    socket.emit('skip', event.clientX);
});

socket.on('globalSkip', (event) => {   
    // x where the bar was clicked
    let clickScreenX = event;
    // where the box currently is
    let currentBoxLeft = progressDot.offsetLeft;

    // console.log(`clickedX: ${clickScreenX}, currentBoxLeft: ${currentBoxLeft}`);

    if (currentBoxLeft < clickScreenX) {
        if (clickScreenX < 690) {
            progressDot.style.left = clickScreenX - 50 + 'px';
            console.log('skipped forwards');
        }
    } 
    else if (currentBoxLeft > clickScreenX) {
        progressDot.style.left = clickScreenX - 50 + 'px';
        console.log('skipped backwards');
    }

    let fraction = ((clickScreenX - 50)/640);
    player.seekTo(player.getDuration() * fraction);
});