const socket = io();

const playButton = document.querySelector('#playButton');
const pauseButton = document.querySelector('#pauseButton');
const progressBar = document.querySelector("#progress-bar");
const progressDot = document.querySelector('#dot');

// progress bar loop

// let progressBarLoop = setInterval(barMovement,200);


function barMovement(){
    // the percentage of the bar that the dot should move
    let fraction = player.getCurrentTime()/player.getDuration()*100;
    console.log(fraction);
    // moves the dot across the bar 
    progressDot.style.left = fraction.toString() + '%';
    // Stops dot from moving if the video is over
    if(fraction === 100){
        clearInterval(progressBarLoop);
    }
}

// ----SOCKET LISTENERS----

// plays all connections
socket.on('globalPlay', () => { 
    player.playVideo();
});

// pauses all connections
socket.on('globalPause', () => {
    player.pauseVideo();
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
    // x where the bar was clicked
    let clickScreenX = event.screenX;
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
    console.log(fraction);
    player.seekTo(player.getDuration() * fraction);

});


/*
    Make

*/

/*
    player is from screenX: 50, to screenX: 690
    We can click and get the screenX from the click ()
    So move the box that area by checking it's left to see it's 

*/ç
