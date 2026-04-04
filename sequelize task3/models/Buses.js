const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Buses = sequelize.define('Buses',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true

    },
    busNumber:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    totalSeats:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    seatAvailable:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

module.exports = Buses;
