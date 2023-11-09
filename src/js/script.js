

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

document.querySelectorAll('.guardar').forEach(function(button) {
    button.addEventListener('click', function() {
        Swal.fire({
            title: '¡Actualizado!',
            text: 'Los cambios se han guardado exitosamente',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    });
});

document.getElementById('altaTutor').addEventListener('click', function () {
    Swal.fire({
        title: "¿Estás seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, deseo darme de alta!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Actualizado!",
                text: "Tu estatus ha sido modificado",
                icon: "success"
            }).then(() => {
                window.open('profileTutor.html', '_blank');
            });
        }
    });
});

document.getElementById('bajaTutor').addEventListener('click', function () {
    Swal.fire({
        title: "¿Estás seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, deseo darme de baja!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Actualizado!",
                text: "Tu estatus ha sido modificado",
                icon: "success"
            }).then(() => {
                window.open('profile.html', '_blank');
            });
        }
    });
});











