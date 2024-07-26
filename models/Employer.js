const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

class Employer extends Model {
 

  async setPassword(password) {
    this.password = await bcrypt.hash(password, 10);
  }

  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

Employer.init({
  company_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  employee_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company_address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  company_phone: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Employer',
  tableName: 'user_employers',
  timestamps: true
});

module.exports = Employer;
