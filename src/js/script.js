/* Ventana CHATS */
var hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function(){
  document.querySelector("body").classList.toggle("active");
})


document.addEventListener('DOMContentLoaded', function() {
    const chatListItems = document.querySelectorAll('.chat-list li');
    const chatMessages = document.getElementById('chat-messages');
    const sendButton = document.getElementById('send-button');
    const inputMessage = document.querySelector('.chat-input input');

    chatListItems.forEach(function(item) {
        item.addEventListener('click', function() {
            chatListItems.forEach(function(item) {
                item.classList.remove('active');
            });

            item.classList.add('active');
            chatMessages.innerHTML = '';
        });
    });

    sendButton.addEventListener('click', sendMessage);

    inputMessage.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita el comportamiento por defecto
            sendMessage(); // Llama a la función sendMessage
        }
    });

    function sendMessage() {
        var messageInput = document.getElementById('message-input');

        if (messageInput.value.trim() !== '') {
            var message = document.createElement('div');
            message.className = 'message sent';
            message.innerHTML = '<p>' + messageInput.value + '</p>';
            chatMessages.appendChild(message);
            messageInput.value = '';
        }
    }
});

/*Ventana Perfil*/

document.getElementById('validationCustom06').addEventListener('change', function() {
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('preview').setAttribute('src', e.target.result);
    }
    reader.readAsDataURL(this.files[0]);
});


