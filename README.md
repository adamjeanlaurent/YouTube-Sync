# YouTube-Sync
A simple web application for you and your friends to use to synchronize your YouTube watching experience.

Synchronizes user actions (Playing, Pausing, Skipping) through the use of websocket technology. 

## How It Works
- The Stack used here is simple, Node.js, vanilla JavaScript, HTML, CSS.

- The user's action are synchronized through the use of websockets, (more in-depth explanatation here: https://en.wikipedia.org/wiki/WebSocket), which allow for an ongoing TCP connction between the client and the server.
This is dissimilar to HTTP where the client requests some information from the server, a connection is made, data is transfered, then the connection ends. Websockets allows for constant two way connection without requiring a request.

- Used the Socket.io library to implement web sockets (Docs here: https://socket.io/docs/)

- I had to build my own controller layer above the youtube native controls, because the native controls didn't allow for me to synchronize events in my own server, so I had to build my own progress bar, and play and pause buttons.
## How To Use

- Clone this repository

- Choose a video by setting the 'videoId:' in index.ejs to the ID of the video you want to watch.

- Deploy however you would like.

- Send the link to your friends and watch videos together!

- Customize how you wish, YouTube iFrame API is used here (https://developers.google.com/youtube/iframe_api_reference), there are a ton of options so you can customize your viewing experience.

## Gif Of Usage

<img src = "yt.gif">
Sample Video Creds: https://www.youtube.com/watch?v=WWggmC8kYZc

## Installation and Setup Instructions

Clone down this repository. You will need `node` , and `npm` installed globally on your machine.  

Installation:

`npm i`

To Start Server:

Open A new terminal session and run `node app.js` in the project directory.

To Visit App:

`localhost:3000`

## Reflection

- Throughout building this project I learned a lot about HTTP and HTTPS, and how clients and servers talk to each other.
- I learned websockets and how to build real time applications using socket.io.
