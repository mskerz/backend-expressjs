const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // เชื่อมต่อกับ Sequelize instance

class WorkBookmarked extends Model {}

WorkBookmarked.init({
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  jobpost_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'job_posts',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'WorkBookmarked',
  tableName: 'work_bookmarked',
  timestamps: true
});

module.exports = WorkBookmarked;
