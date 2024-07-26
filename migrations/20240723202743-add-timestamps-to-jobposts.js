'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // เพิ่มคอลัมน์ createdAt และ updatedAt
    await queryInterface.addColumn('job_posts', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW // กำหนดค่าเริ่มต้นเป็นเวลาปัจจุบัน
    });

    await queryInterface.addColumn('job_posts', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW, // กำหนดค่าเริ่มต้นเป็นเวลาปัจจุบัน
      onUpdate: Sequelize.NOW // อัปเดตเป็นเวลาปัจจุบันเมื่อมีการเปลี่ยนแปลง
    });
  },

  down: async (queryInterface, Sequelize) => {
    // ลบคอลัมน์ createdAt และ updatedAt
    await queryInterface.removeColumn('job_posts', 'createdAt');
    await queryInterface.removeColumn('job_posts', 'updatedAt');
  }
};
