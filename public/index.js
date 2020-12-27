const passwordInput = document.querySelector('input');
const createRoomButton = document.querySelector('button');

const createRoom = async() => {
    let options = {method: 'POST'};
    
    const url = `/api/v1/room/create/${passwordInput.value}`;

    let res = await fetch(url, options);
    let json = await res.json();
    
    return json.id;
}

const roomExists = async(id) => {
    const url = `/api/v1/room/exists/${id}`;
    
    let res = await fetch(url);
    let json = await res.json();

    return json;
};

createRoomButton.addEventListener('click', async() => {
    try {
        let id = await createRoom();

        // ensure room with this id exists
        let doesRoomExist = await roomExists(id);
        
        if(doesRoomExist){
            // send to room
        }

        else {
            // send error message ? 
        }
        

    }
    catch {
        // errors
    }
    
});