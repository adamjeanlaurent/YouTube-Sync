const passwordInput = document.querySelector('input');
const createRoomButton = document.querySelector('button');

const createRoom = async() => {
    let options = {method: 'POST'};
    
    const url = `/api/v1/room/create/${passwordInput.value}`;

    let res = await fetch(url, options);
    let json = await res.json();
    
    return json.id;
}

createRoomButton.addEventListener('click', async() => {
    try {
        let id = await createRoom();
        window.location = `/room/join/${id}`;
    }

    catch {

    }
    
});