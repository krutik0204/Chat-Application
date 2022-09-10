const socket = io('http://localhost:8000');

const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
const btn = document.getElementById("btn")
var audio=new Audio('ykds.mp3');

const append = (text, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = text;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}

btn.addEventListener('click', function () {
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message)
    messageInput.value = ''
})



const username = prompt("Enter Your Name To Join");
socket.emit('new-user-joined', username)

socket.on('user-joined', (username) => {
    if (username != null) {
        append(`${username} joined the chat!`, 'right')
    }
})

socket.on('receive', (data) => {
    if (data != null) {
        append(`${data.username}:${data.data}`, 'left')
    }
})

socket.on('left', username => {
    append(`${username} left the chat`, 'left')
});