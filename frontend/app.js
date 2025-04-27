// const { text } = require("body-parser");

const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('message');
const messages = document.getElementById('messages');

let mySocketId = '';
socket.on('connect', () => {
  mySocketId = socket.id;
  console.log('Connected with socket ID:', mySocketId);
});


form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message',{
        id: mySocketId,
        text: input.value
    });
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  item.textContent = msg.text;
    if (msg.id === mySocketId) {
        item.classList.add('sent');
        breakline = document.createElement('br');
    } else {
        item.classList.add('received');
        console.log('Received message from:', item);
        breakline = document.createElement('br');
    }
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
