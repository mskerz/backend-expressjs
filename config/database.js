const { Sequelize } = require('sequelize');
const config = require('./config.json'); // ตรวจสอบให้แน่ใจว่า path ถูกต้อง
// const dbConfig = config.development;
const dbConfig = config.production;

// const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
//   host: dbConfig.host,
//   dialect: dbConfig.dialect,
//   timezone: dbConfig.timezone,
// });

const sequelize = new Sequelize('mysql://root:wvbqVssiMyeFKKImWzvJsnduKZWOVCne@roundhouse.proxy.rlwy.net:43486/railway', {
  dialect: 'mysql',
  // options add here if needed
});

module.exports = sequelize;
