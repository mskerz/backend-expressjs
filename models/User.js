const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database'); // เชื่อมต่อกับ Sequelize instance
const WorkBookmarked = require('./workbookmarked');
const JobApplicant = require('./JobApplicant');

class User extends Model {
  // Method สำหรับการเข้ารหัสรหัสผ่านก่อนการบันทึก
  async setPassword(password) {
    this.password = await bcrypt.hash(password, 10);
  }

  // Method สำหรับตรวจสอบรหัสผ่าน
  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init({
  firstname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: true
});


// ความสัมพันธ์
User.hasMany(WorkBookmarked, { foreignKey: 'user_id', as: 'bookmarkedJobs' });
User.hasMany(JobApplicant, { foreignKey: 'user_id', as: 'applications' });
JobApplicant.belongsTo(User,{foreignKey:'user_id'})

WorkBookmarked.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
module.exports = User;
