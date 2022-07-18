const socket = io();

// DOM elements
let username = document.getElementById('username');
let message = document.getElementById('message');
let send = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

send.addEventListener('click', function () {
    socket.emit('chat:message', {
        username: username.value,
        message: message.value
    });
});

message.addEventListener('focusin', function () {
    socket.emit('chat:typing', username.value);
});

message.addEventListener('focusout', function () {
    socket.emit('chat:notyping', username.value);
});

socket.on('chat:message', function (data) {
    let time = new Date();
    output.innerHTML += `
    <p>
        <strong>${data.username}</strong>: ${data.message}<br>
        <span>${time.toLocaleString('es-MX', {hour: 'numeric', minute: "numeric", second: 'numeric', hour12: true})}</span>
    </p>
    `;
    output.scrollIntoView(false);
});

socket.on('chat:typing', function (data) {
    console.log(data);
    actions.innerHTML = `
    <p>
       <em> ${data} is typing a message...</em>
    </p>
    `;
});

socket.on('chat:notyping', function () {
    actions.innerHTML = `<p></p>`;
});