const{DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Course = sequelize.define('Course',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true

    },
    courseName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports = Course;