// public/javascripts/register.js

document.addEventListener('DOMContentLoaded', function () {

    const signinBtn = document.getElementById('signinBtn');

    const signupBtn = document.getElementById('signupBtn');

    signinBtn.addEventListener('click', async function () {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        try {
          const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password}),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Inicio de sesión exitoso',
            }).then(() => {
              window.location.href = "/dashboard";
            });
          } else {
            // Login failed
            Swal.fire({
              icon: 'warning',
              title: 'Error',
              text: data.message || 'El correo electrónico o la contraseña son incorrectos',
            });
          }
        } catch (error) {
          console.error('Error during login:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error en el inicio de sesión',
          });
        }
      });
  
    signupBtn.addEventListener('click', async function () {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const repeatPassword = document.getElementById('repeatPassword').value;
        
        if (password !== repeatPassword) {
            // Passwords do not match
            Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Las contraseñas no coinciden',
            });
            return;
        }

        if (!isValidEmail(email)) {
            Swal.fire({
              icon: 'warning',
              title: 'Error',
              text: 'El correo electrónico no es válido',
            });
            return;
          }
      
        if (!isValidPassword(password)) {
            Swal.fire({
              icon: 'warning',
              title: 'Error',
              text: 'La contraseña debe tener al menos 6 caracteres, una letra mayúscula, un número y un símbolo',
            });
            return;
        }
    
        try {
            const response = await fetch('/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Registro exitoso',
                }).then(() => {
                    window.location.href = "/dashboard";
                });
            } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message || 'Hubo un error en el registro',
            });
            }
        } catch (error) {
            console.error('Error during registration:', error);
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error en el registro',
            });
        }
        });
    });

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


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    // Password must be at least 6 characters long
    // Must contain at least one capital letter, one number, and one symbol
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
    return passwordRegex.test(password);
}
