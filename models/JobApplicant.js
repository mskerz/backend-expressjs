const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure this points to your Sequelize instance
const User = require('./User');
class JobApplicant extends Model {}

JobApplicant.init(
  {
    job_post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'job_posts',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'JobApplicant',
    tableName: 'job_applicants',
    timestamps: true,
  }
);


module.exports = JobApplicant;
