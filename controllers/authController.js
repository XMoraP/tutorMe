// controllers/authController.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/signup', async (req, res) => {

    console.log('3. ESTOY EN SIGNUP');

    const { name, email, password } = req.body;

    try {
        console.log('Start registration process');

        await User.createUser({ nombre: name, eMail: email, contrasenna: password });

        // Registration successful
        console.log('Registration successful');
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    } finally {
    console.log('End registration process');
  }
});

module.exports = router;
