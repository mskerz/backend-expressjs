const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // ปรับเส้นทางตามที่ตั้ง

class RefreshTokenEmp extends Model {
    static async createToken(employerId, token) {
        return await RefreshTokenEmp.create({
            employerId,
            token,
            expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day
        });
    }

    // Method สำหรับการตรวจสอบความถูกต้องของ Refresh Token
    static async validateToken(token) {
        const refreshToken = await RefreshTokenEmp.findOne({ where: { token } });
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
        return await RefreshTokenEmp.destroy({ where: { token } });
    }
}

RefreshTokenEmp.init({
  token: {
    type: DataTypes.STRING,
    allowNull: false
  },
  employerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user_employers',
      key: 'id'
    }
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'RefreshTokenEmp',
  tableName: 'refresh_token_emps',
  timestamps: true,
});

module.exports = RefreshTokenEmp;
