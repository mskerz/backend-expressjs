const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // ปรับเส้นทางตามที่ตั้งของไฟล์เชื่อมต่อฐานข้อมูล

class WorkClassify extends Model { }

WorkClassify.init({
    work_classify_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'WorkClassify',
    tableName: 'work_classifies',
    timestamps: true
});

module.exports = WorkClassify;
