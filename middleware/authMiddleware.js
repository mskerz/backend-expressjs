require('dotenv').config();
const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshTokens'); // เชื่อมต่อกับโมเดล RefreshToken
const RefreshTokenEmp = require('../models/RefreshTokenEmp');
const SECRET_KEY = process.env.AUTH_SECRET_KEY;

const authentication =(req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!authHeader) {
        // console.log(authHeader);
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    try {
        const decode = jwt.verify(token,SECRET_KEY)
        console.log(decode);
        req.user = decode;
        next();
    } catch (error) {
        
        console.error(error);
        res.status(400).json({ message: 'Invalid token' ,"token_invalid":token});
    }
}

const verifyRefreshToken = async (req, res, next) => {
    const { refresh_token } = req.body;
    
    if (!refresh_token) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        // ตรวจสอบว่า refresh token มีอยู่ในฐานข้อมูล และยังไม่หมดอายุ
        const refreshToken = await RefreshToken.validateToken(refresh_token);
        req.refreshToken = refreshToken;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
};

const RefreshTokenEmployer = async (req, res, next) => {
    const { refresh_token } = req.body;
    
    if (!refresh_token) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        // ตรวจสอบว่า refresh token มีอยู่ในฐานข้อมูล และยังไม่หมดอายุ
        const refreshToken = await RefreshTokenEmp.validateToken(refresh_token);
        req.refreshToken_emp = refreshToken;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
};
module.exports = {authentication , verifyRefreshToken,RefreshTokenEmployer};
