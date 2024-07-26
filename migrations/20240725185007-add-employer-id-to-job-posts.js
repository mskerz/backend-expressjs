'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('job_posts', 'employer_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user_employers', // หรือชื่อที่ถูกต้องของตารางนายจ้าง
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('job_posts', 'employer_id');
  }
};
