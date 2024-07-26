const express = require('express');
const router = express.Router();
const EmployerAuthController = require('../controllers/EmployerAuthController');
const { authentication, RefreshTokenEmployer } = require('../middleware/authMiddleware');

// Register new employer

router.post('/emp-register', EmployerAuthController.Emp_register);

// Employer login
router.post('/emp-login', EmployerAuthController.Emp_login);

// Update employer profile
router.put('/emp-profile', authentication, EmployerAuthController.Emp_updateProfile);

// Change employer password
router.put('/emp-change-password', authentication, EmployerAuthController.Emp_changePassword);

// Verify employer
router.get('/emp-verify', authentication, EmployerAuthController.Emp_verifyEmployer);

// Refresh access token
router.post('/emp-refresh-token', RefreshTokenEmployer, EmployerAuthController.Emp_refreshToken);

module.exports = router;
