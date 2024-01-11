// controllers/authController.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

console.log('Reached /signup endpoint');
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic input validation
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
        }

        // Check if the user already exists
        const existingUser = await User.findUser(name, password);
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists.' });
        }

        // Create a new user
        await User.createUser({ nombre: name, eMail: email, contrasenna: password });

        // Registration successful
        return res.status(201).json({ success: true, message: 'Registration successful.' });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

module.exports = router;
