const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/database')

class WorkType extends Model{}

WorkType.init({
    worktype_name:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName:'WorkType',
    tableName:'work_types',
    timestamps:true,
})

module.exports = WorkType