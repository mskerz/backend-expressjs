const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

class Address extends Model {}

Address.init({
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName:'Address',
    tableName:'addresses'
})

User.hasMany(Address, { onDelete: "CASCADE" });
Address.belongsTo(User);

module.exports = Address;
