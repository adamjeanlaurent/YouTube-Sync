let input = document.querySelector('input');
let button = document.querySelector('button');

const getId = async() => {
    let options = {method: 'POST'};
    let res = await fetch('http://localhost:3000/api/v1/createRoom', options);
    let json = await res.json();
    
    return json.id;
}

button.addEventListener('click', async() => {
    let id = await getId();
    input.value = id;
});