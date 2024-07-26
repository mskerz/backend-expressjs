'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blacklist_tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
      // ไม่ต้องระบุ updatedAt ที่นี่
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blacklist_tokens');
  }
};
