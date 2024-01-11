// controllers/authController.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
    try {
      const { email, password} = req.body;
  
      // Basic input validation
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
      }
  
      // Find the user by email and password
      const user = await User.findUserByEmailAndPassword(email, password);
  
      if (user) {
        // Login successful
        return res.status(200).json({ success: true, message: 'Login successful.', user });
      } else {
        // User not found or incorrect credentials
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
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
