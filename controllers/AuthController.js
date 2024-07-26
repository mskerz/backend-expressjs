const RefreshToken = require('../models/RefreshTokens');
const User = require('../models/User'); // เชื่อมต่อกับโมเดล User
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Secret Key for JWT
const SECRET_KEY = process.env.AUTH_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY; // กำหนดคีย์ลับสำหรับ refresh token



class AuthController {
    // Register a new user
    async register(req, res) {
        const { firstname, lastname, email, password, age } = req.body;
        try {
            // Check if user already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create new user
            const user = await User.create({ firstname, lastname, email, password, age });
            await user.setPassword(password); // Encrypt password before saving

            // Respond without showing the password
            const userData = user.toJSON();
            delete userData.password;

            res.status(201).json({ "message": "Registration successfull" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // User login
    async login(req, res) {
        const { email, password } = req.body;
        try {
            // Find user by email
            const user = await User.findOne({ where: { email } });
            if (!user || !(await user.comparePassword(password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Compare passwords
            // Create JWT token
            const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = await RefreshToken.createToken(user.id, jwt.sign({ id: user.id }, REFRESH_SECRET_KEY, { expiresIn: '1d' }));
            await refreshToken.save();
           
            // Respond with token
            res.status(200).json({ "message": "login success with AuthController", "accessToken": accessToken,"refreshToken":refreshToken.token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Update user profile
    async updateProfile(req, res) {
        const { firstname, lastname, email, age } = req.body;
        try {
            const user = await User.findByPk(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update user fields if they are provided
            if (firstname) user.firstname = firstname;
            if (lastname) user.lastname = lastname;
            if (email) user.email = email;
            if (age) user.age = age;

            // Save updates
            await user.save();

            // Respond without showing the password
            const userData = user.toJSON();
            delete userData.password;

            res.status(200).json(userData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Change user password
    async changePassword(req, res) {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        try {
            const user = await User.findByPk(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Check if current password is correct
            const isMatch = await user.comparePassword(currentPassword);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }

            // Check if new passwords match
            if (newPassword !== confirmNewPassword) {
                return res.status(400).json({ message: 'New passwords do not match' });
            }

            // Set new password
            await user.setPassword(newPassword);
            await user.save();

            res.status(200).json({ message: 'Password updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Verify user
    async verifyUser(req, res) {
        try {
            const user = await User.findByPk(req.user.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Respond without showing the password
            const userData = user.toJSON();
            delete userData.password;

            res.status(200).json(userData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async refreshToken(req, res) {
        const { token } = req.refreshToken; // ใช้ refresh token ที่เก็บไว้ใน req
        try {
            const validToken = await RefreshToken.validateToken(token);

            const accessToken = jwt.sign({ id: validToken.userId }, SECRET_KEY, { expiresIn: '15m' });
            res.status(200).json({accessToken});
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Invalid or expired refresh token' });
        }
    }
}

module.exports = new AuthController();
