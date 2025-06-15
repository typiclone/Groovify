const express = require('express');
const router = express.Router();
const {
  login,
  callback,
  refresh
} = require('../controllers/authController');

// Redirect user to Spotify login
router.get('/login', login);

// Handle redirect back from Spotify with code
router.get('/callback', callback);

// Handle token refresh
router.get('/refresh', refresh);

module.exports = router;
