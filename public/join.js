const passwordInput = document.querySelector('input');
const button = document.querySelector('button');

const authenticate = async(roomID, password) => {
    // send to auth route
    // get token back
    // save token
    // route to actual room 
    // if error
    // display incorrect passwprd
    // or internal error etc.
};

const getRoomIDFromURL = () => {
    const currentURL = window.location.href;
    return currentURL.split('/join/')[1];
};

button.addEventListener('click', async() => {
    const password = passwordInput.value;
    
    const roomID = getRoomIDFromURL();

    // call autheticante functiin
    await authenticate();
});

