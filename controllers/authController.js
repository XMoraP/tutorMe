// controllers/authController.js
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you have a User model

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Add server-side validation if needed

    // Assuming you have a User model with a createUser method
    await User.createUser({ nombre: name, eMail: email, contrasenna: password });

    // Registration successful
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Add other authentication-related routes and actions...

module.exports = router;
