'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // เพิ่มคอลัมน์ worktype_id
    await queryInterface.addColumn('job_posts', 'worktype_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // คอลัมน์นี้อนุญาตให้เป็นค่า NULL
      references: {
        model: 'work_types', // ชื่อของตารางที่เชื่อมโยง
        key: 'id' // คีย์ที่เชื่อมโยงในตารางที่เชื่อมโยง
      },
      onUpdate: 'CASCADE', // อัปเดตเมื่อมีการเปลี่ยนแปลงในตารางที่เชื่อมโยง
      onDelete: 'SET NULL' // ตั้งค่าเป็น NULL เมื่อมีการลบจากตารางที่เชื่อมโยง
    });

    // เพิ่มคอลัมน์ workclassify_id
    await queryInterface.addColumn('job_posts', 'workclassify_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // คอลัมน์นี้อนุญาตให้เป็นค่า NULL
      references: {
        model: 'work_classifies', // ชื่อของตารางที่เชื่อมโยง
        key: 'id' // คีย์ที่เชื่อมโยงในตารางที่เชื่อมโยง
      },
      onUpdate: 'CASCADE', // อัปเดตเมื่อมีการเปลี่ยนแปลงในตารางที่เชื่อมโยง
      onDelete: 'SET NULL' // ตั้งค่าเป็น NULL เมื่อมีการลบจากตารางที่เชื่อมโยง
    });
  },

  down: async (queryInterface, Sequelize) => {
    // ลบคอลัมน์ worktype_id
    await queryInterface.removeColumn('job_posts', 'worktype_id');

    // ลบคอลัมน์ workclassify_id
    await queryInterface.removeColumn('job_posts', 'workclassify_id');
  }
};
