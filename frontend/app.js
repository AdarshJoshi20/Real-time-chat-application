// this is the clinet-side code for the chat application using socket.io
const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('message');
const messages = document.getElementById('messages');

let mySocketId = '';
socket.on('connect', () => {
  mySocketId = socket.id;
  console.log('connected to server with ID:', mySocketId);
});


//send message to server
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if(input.value.trim()) {
    socket.emit('sendMessage', {
      sender_name:username,
      sender_id: mySocketId,
      text: input.value
    });
    input.value = '';
  }
});

// receive message from server
socket.on('receiveMessage', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg.text;
  li.classList.add(
    msg.sender_id === mySocketId ? 'sent' : 'received'
  );
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight; // auto scroll to bottom
});
  




form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    socket.emit('chat message',{
        id: mySocketId,
        username: username,
        text: input.value.trim()
    });
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const item = document.createElement('li');
  const nameTag = document.createElement('strong');
  nameTag.textContent = msg.username + ': ';
  item.appendChild(nameTag);
  
  item.textContent = msg.text;

    if (msg.id === mySocketId) {
        item.classList.add('sent');
        console.log('Sent message to:', item);
        breakline = document.createElement('br');
    } else {
        item.classList.add('received');
        console.log('Received message from:', item);
        breakline = document.createElement('br');
    }
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
