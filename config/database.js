const { Sequelize } = require('sequelize');
const config = require('./config.json'); // ตรวจสอบให้แน่ใจว่า path ถูกต้อง
const dbConfig = config.development;

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  timezone: dbConfig.timezone
});

module.exports = sequelize;
