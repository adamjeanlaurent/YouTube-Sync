let h1 = document.querySelector('h1');
let id = getId();

async function getId() {
    let options = {method: 'POST'};
    let res = await fetch('http://localhost:3000/api/v1/createRoom', options);
    let json = await res.json();
    
    h1.textContent = json.id;
    return json;
}
