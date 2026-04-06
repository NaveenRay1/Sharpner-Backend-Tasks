const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Expense = sequelize.define('Expense',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    amount:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    },
    date: {
    type: DataTypes.DATE,
    allowNull: false
}
});

module.exports = Expense;