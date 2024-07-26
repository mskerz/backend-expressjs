const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');


class RefreshToken extends Model {
    // Method สำหรับการตั้งค่า Refresh Token และระบุวันหมดอายุ
    static async createToken(userId, token) {
        return await RefreshToken.create({
            userId,
            token,
            expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day
        });
    }

    // Method สำหรับการตรวจสอบความถูกต้องของ Refresh Token
    static async validateToken(token) {
        const refreshToken = await RefreshToken.findOne({ where: { token } });
        // console.log(refreshToken.token);
        if (!refreshToken) {
            throw new Error('Invalid token');
        }
        if (refreshToken.expiresAt < new Date()) {
            throw new Error('Token has expired');
        }
        return refreshToken;
    }

    // Method สำหรับการลบ Refresh Token
    static async deleteToken(token) {
        return await RefreshToken.destroy({ where: { token } });
    }
}

RefreshToken.init({
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
},{
    sequelize,
    modelName:'RefreshToken',
    tableName:'refresh_tokens'
})


module.exports = RefreshToken;
