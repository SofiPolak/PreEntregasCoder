socket = io()

const listMessages = document.getElementById('messages')

const btnSend = document.getElementById('btn-send')

btnSend.addEventListener('click', () => {
    const user = document.getElementById('user').value;
    const message = document.getElementById('message').value;
    socket.emit('addMessage', { user, message });

})

socket.on('messages', messages => {
    listMessages.innerHTML = ``;
    messages.forEach(message => {
        const newMessage = document.createElement('li');
        newMessage.innerHTML = `<strong>Usuario: </strong>${message.user}, <strong>Mensaje: </strong>${message.message}`;
        listMessages.appendChild(newMessage);
    });
})