const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { sendWelcomeEmail } = require('../services/emailService');
const router = express.Router();

// Mock database to store users for demo purposes
const mockUsers = new Map();

// Register a new user
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log('Signup attempt:', { name, email });
    
    // Check if user already exists in our mock database
    if (mockUsers.has(email)) {
      return res.status(400).json({ message: 'Oops! That account already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user and store in mock database
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      name: name,
      email: email,
      password: hashedPassword
    };
    
    mockUsers.set(email, user);

    // Create JWT token
    const token = jwt.sign(
      { user: { id: user.id } },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    // Send welcome email (async, don't wait for it)
    sendWelcomeEmail(user.email, user.name).catch(err => {
      console.error('Failed to send welcome email:', err);
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt:', { email });
    
    // Check if user exists in mock database
    if (!mockUsers.has(email)) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const storedUser = mockUsers.get(email);
    
    // Check password
    const isMatch = await bcrypt.compare(password, storedUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { user: { id: storedUser.id } },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: storedUser.id,
        name: storedUser.name,
        email: storedUser.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify token and get user info
router.get('/verify', auth, async (req, res) => {
  try {
    // Find user in mock database
    let foundUser = null;
    for (const [email, user] of mockUsers.entries()) {
      if (user.id === req.user.id) {
        foundUser = {
          id: user.id,
          name: user.name,
          email: user.email
        };
        break;
      }
    }

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: foundUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
