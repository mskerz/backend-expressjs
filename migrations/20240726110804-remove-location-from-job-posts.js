'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('job_posts', 'location');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('job_posts', 'location', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
