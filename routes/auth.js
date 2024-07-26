require('dotenv').config();
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const {authentication,verifyRefreshToken} = require('../middleware/authMiddleware')


// Register a new user
router.post('/register', AuthController.register);

// User login
router.post('/login', AuthController.login);

// Update user profile
router.put('/update-profile', authentication, AuthController.updateProfile);

// Change user password
router.put('/change-password', authentication, AuthController.changePassword);

// Verify user
router.get('/verify-user', authentication, AuthController.verifyUser);

// refresh token
router.post('/refresh-token',verifyRefreshToken,AuthController.refreshToken)
module.exports = router;
