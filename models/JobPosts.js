const { Model, DataTypes } = require('sequelize');
const WorkBookmarked = require('./WorkBookmarked');
const Employer = require('./Employer');
const sequelize = require('../config/database')
class JobPosts extends Model {
  // Method สำหรับการตรวจสอบว่าการประกาศงานยังเปิดอยู่หรือไม่
  isOpen() {
    return this.status === 'open';
  }

  // Method สำหรับการเปลี่ยนสถานะของการประกาศงาน
  async closePost() {
    this.status = 'closed';
    await this.save();
  }
}

JobPosts.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  salary: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'open' // ค่าปริยายเป็น 'open'
  },
  worktype_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // คอลัมน์นี้อนุญาตให้เป็นค่า NULL
    references: {
      model: 'work_types', // ชื่อของตารางที่เชื่อมโยง
      key: 'id' // คีย์ที่เชื่อมโยงในตารางที่เชื่อมโยง
    },
    onUpdate: 'CASCADE', // อัปเดตเมื่อมีการเปลี่ยนแปลงในตารางที่เชื่อมโยง
    onDelete: 'SET NULL' // ตั้งค่าเป็น NULL เมื่อมีการลบจากตารางที่เชื่อมโยง
  },
  workclassify_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // คอลัมน์นี้อนุญาตให้เป็นค่า NULL
    references: {
      model: 'work_classifies', // ชื่อของตารางที่เชื่อมโยง
      key: 'id' // คีย์ที่เชื่อมโยงในตารางที่เชื่อมโยง
    },
    onUpdate: 'CASCADE', // อัปเดตเมื่อมีการเปลี่ยนแปลงในตารางที่เชื่อมโยง
    onDelete: 'SET NULL' // ตั้งค่าเป็น NULL เมื่อมีการลบจากตารางที่เชื่อมโยง
  },
  employer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user_employers',
      key: 'id'
    }
  }
  
}, {
  sequelize,
  modelName: 'JobPosts',
  tableName: 'job_posts',
  timestamps: true
});

// ความสัมพันธ์
JobPosts.hasMany(WorkBookmarked, { foreignKey: 'jobpost_id', as: 'bookmarkedBy' });
WorkBookmarked.belongsTo(JobPosts, { foreignKey: 'jobpost_id', as: 'jobPost' });

// Jobpost relation to Employer
JobPosts.belongsTo(require('./WorkType'), { foreignKey: 'worktype_id', as: 'w_type' });
JobPosts.belongsTo(require('./WorkClassify'), { foreignKey: 'workclassify_id', as: 'w_classify' });
JobPosts.belongsTo(require('./Employer'), { foreignKey: 'employer_id', as: 'employer' });

Employer.hasMany(JobPosts, { foreignKey: 'employer_id', as: 'jobPosts' });
module.exports = JobPosts;
