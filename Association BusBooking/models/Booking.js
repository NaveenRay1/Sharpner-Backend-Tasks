const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Booking = sequelize.define('Booking',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    busId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    seatNumber:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

module.exports = Booking;