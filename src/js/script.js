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


/* Calendario */
const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

/* To Do List*/

let count = 0;

document.querySelector('#push').onclick = function(){
    if(document.querySelector('#newtask input').value.length == 0){
        alert("Introduce una tarea")
    }
    else{
        if (count < 7) {  // Límite de 5 elementos span
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
            for(var i=0; i<current_tasks.length; i++){
                current_tasks[i].onclick = function(){
                    this.parentNode.remove();
                }
            }
            count++;
        } else {
            alert("Has llegado al máximo de tareas por día.")
        }
    }
}

/*Ventana Perfil*/

document.getElementById('validationCustom06').addEventListener('change', function() {
    var reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('preview').setAttribute('src', e.target.result);
    }
    reader.readAsDataURL(this.files[0]);
});


