// public/javascripts/register.js
document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('submitBtn');
  
    submitBtn.addEventListener('click', async function () {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const repeatPassword = document.getElementById('repeatPassword').value;

        console.log('1. EN CAMINOOOOO');
    
        // Add any additional client-side validation here if needed
    
        if (password !== repeatPassword) {
            // Passwords do not match
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden',
            });
            return;
        }
    
        // Send data to the server for registration
        try {
            console.log('2. QUE  VA AL SIGNUP');

            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            console.log('2.2 QUE  VA AL SIGNUP');
    
            const data = await response.json();

            console.log('2.3 QUE  VA AL SIGNUP');
    
            if (response.ok) {
            // Registration successful
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Registro exitoso',
                }).then(() => {
                    window.location.href = "/dashboard";
                });
            } else {
            // Registration failed
            Swal.fire({
                icon: 'error',
                title: 'Error 1',
                text: data.message || 'Hubo un error en el registro',
            });
            }
        } catch (error) {
            console.error('Error during registration:', error);
            Swal.fire({
            icon: 'error',
            title: 'Error 2',
            text: 'Hubo un error en el registro',
            });
        }
        });
    });
  

// Interact with DOM elements
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
    title.innerHTML = "Regístrate";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");

};

signinBtn.onclick = function () {
    nameField.style.maxHeight = "0";
    title.innerHTML = "Iniciar Sesión";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
};
