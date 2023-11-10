/* ----- CHATS ------*/
var hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", function () {
    document.querySelector("body").classList.toggle("active");
})


document.addEventListener('DOMContentLoaded', function () {
    const chatListItems = document.querySelectorAll('.chat-list li');
    const chatMessages = document.getElementById('chat-messages');
    const sendButton = document.getElementById('send-button');
    const inputMessage = document.querySelector('.chat-input input');

    chatListItems.forEach(function (item) {
        item.addEventListener('click', function () {
            chatListItems.forEach(function (item) {
                item.classList.remove('active');
            });

            item.classList.add('active');
            chatMessages.innerHTML = '';
        });
    });

    sendButton.addEventListener('click', sendMessage);

    inputMessage.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
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


/* ----- CALENDAR ------*/
const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");


let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});

/* ----- TO DO LIST ------*/

let count = 0;

document.querySelector('#push').onclick = function () {
    if (document.querySelector('#newtask input').value.length == 0) {
        alert("Introduce una tarea")
    }
    else {
        if (count < 7) {
            document.querySelector('#tasks').innerHTML += `
            <ul class="list-group">
                <li class="list-group-item">
                        <span id="taskname${count}">
                            ${document.querySelector('#newtask input').value}
                        </span>
                        <button class="delete" style="background-color: #0d6efd;">
                            <i class="far fa-trash-alt"></i>
                        </button>
                </li>
            </ul>
            `;
            var current_tasks = document.querySelectorAll(".delete");
            for (var i = 0; i < current_tasks.length; i++) {
                current_tasks[i].onclick = function () {
                    this.parentNode.remove();
                }
            }
            count++;
        } else {
            alert("Has llegado al máximo de tareas por día.")
        }
    }
}

/* ----- PROFILE ------*/

function tutor(){
    Swal.fire({
        title: "¿Estás seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#130A76",
        cancelButtonColor: "#808080",
        confirmButtonText: "Sí, deseo darme de alta!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Actualizado!",
                text: "Tu estatus ha sido modificado",
                icon: "success",
                confirmButtonColor:  "#130A76"
            }).then(() => {
                window.location.href = 'profileTutor.html';
            });
        }
    });
}

function noTutor() {
    Swal.fire({
        title: "¿Estás seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#130A76",
        cancelButtonColor: "##808080",
        confirmButtonText: "Sí, deseo darme de baja!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Actualizado!",
                text: "Tu estatus ha sido modificado",
                icon: "success",
                confirmButtonColor:  "#130A76"
            }).then(() => {
                window.location.href = 'profile.html';
            });
        }
    });
}

function showAlert() {
    Swal.fire({
      title: '¡Actualizado!',
      text: 'Los cambios se han guardado exitosamente',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor:  "#130A76"
    });
  }












