const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('new_database', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+07:00'
});

const BlacklistToken = sequelize.define('BlacklistToken', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = BlacklistToken;
