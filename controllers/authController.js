// controllers/authController.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
    try {
      const { email, password} = req.body;
  
      const user = await User.findUserByEmailAndPassword(email, password);
      req.session.email = email;

  
      if (user) {
        return res.status(200).json({ success: true, message: 'Login successful.', user });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  });

router.post('/signup', async (req, res) => {

    const { name, email, password } = req.body;

    try {
        console.log('Start registration process');

        await User.createUser({ nombre: name, eMail: email, contrasenna: password });

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
