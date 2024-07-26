// const RefreshToken = require('../models/RefreshTokens');
const Employer = require('../models/Employer');
const jwt = require('jsonwebtoken');
const RefreshTokenEmp = require('../models/RefreshTokenEmp');
require('dotenv').config();

const SECRET_KEY = process.env.AUTH_SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

class EmployerAuthController {
    // Register a new employer
    async Emp_register(req, res) {
        const { company_name, employee_email, password, company_address, company_phone } = req.body;
        try {
            const existingEmployer = await Employer.findOne({ where: { employee_email } });
            if (existingEmployer) {
                return res.status(400).json({ message: 'Employer already exists' });
            }

            const employer = await Employer.create({ company_name, employee_email, password, company_address, company_phone });
            await employer.setPassword(password); // Encrypt password before saving

            res.status(201).json({ message: "Registration successful" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Employer login
    async Emp_login(req, res) {
        const { employee_email, password } = req.body;
        try {
            const employer = await Employer.findOne({ where: { employee_email } });
            if (!employer || !(await employer.comparePassword(password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const accessToken = jwt.sign({ id: employer.id }, SECRET_KEY, { expiresIn: '15m' });
            const refreshToken = await RefreshTokenEmp.createToken(employer.id, jwt.sign({ id: employer.id }, REFRESH_SECRET_KEY, { expiresIn: '1d' }));
            await refreshToken.save();
            res.status(200).json({ message: "Login successful", accessToken, refreshToken: refreshToken.token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Update employer profile
    async Emp_updateProfile(req, res) {
        const { company_name, company_address, company_phone } = req.body;
        try {
            const employer = await Employer.findByPk(req.user.id);
            if (!employer) {
                return res.status(404).json({ message: 'Employer not found' });
            }

            if (company_name) employer.company_name = company_name;
            if (company_address) employer.company_address = company_address;
            if (company_phone) employer.company_phone = company_phone;

            await employer.save();

            res.status(200).json(employer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Change employer password
    async Emp_changePassword(req, res) {
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        try {
            const employer = await Employer.findByPk(req.user.id);
            if (!employer) {
                return res.status(404).json({ message: 'Employer not found' });
            }

            const isMatch = await employer.comparePassword(currentPassword);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }

            if (newPassword !== confirmNewPassword) {
                return res.status(400).json({ message: 'New passwords do not match' });
            }

            await employer.setPassword(newPassword);
            await employer.save();

            res.status(200).json({ message: 'Password updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Verify employer
    async Emp_verifyEmployer(req, res) {
        try {
            const employer = await Employer.findByPk(req.user.id);
            if (!employer) {
                return res.status(404).json({ message: 'Employer not found' });
            }
            const EmployerData = employer.toJSON();
            delete EmployerData.password;
            
            res.status(200).json(employer);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    // Refresh access token
    async Emp_refreshToken(req, res) {
        const { token } = req.refreshToken_emp; // Use refresh token from req emp
        try {
            const validToken = await RefreshTokenEmp.validateToken(token);

            const accessToken = jwt.sign({ id: validToken.employerId }, SECRET_KEY, { expiresIn: '15m' });
            
            res.status(200).json({ accessToken });
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Invalid or expired refresh token' }); 
        }
    }
}

module.exports = new EmployerAuthController();
