
let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");
let passwordField = document.getElementById("password");
let repeatPasswordField = document.getElementById("repeatPassword");
let emailField = document.querySelector('input[type="email"]');
let submitBtn = document.getElementById("submitBtn");

signupBtn.onclick = function () {

    nameField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");

};

signinBtn.onclick = function () {
    nameField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
};

submitBtn.onclick = function () {
    // If all fields are correct, redirect to dashboard.html
    window.location.href = "dashboard.html";
};

//Para usar más adelante un sweet alert
document.getElementById('show-alert').addEventListener('click', function () {
    Swal.fire({
        title: 'Hello!',
        text: 'This is a SweetAlert example.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
});
