const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let newUser;

    // Create a new user
    if (email.includes("rit.ac.in")) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash Password
      newUser = new User({ username, password: hashedPassword, email });
    } 
    else {
      return res.status(400).json({ message: 'Only RIT emails are allowed' });
    }

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token (optional, can be used for authentication)
    const token = jwt.sign({ userId: newUser._id }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.status(201).json({
      message: 'User created successfully',
      token, // You can return a token to use for authentication
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
