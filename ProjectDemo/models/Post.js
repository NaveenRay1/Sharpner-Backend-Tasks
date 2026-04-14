const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Post = sequelize.define('Post',{
        id:{
           type:DataTypes.INTEGER,
           primaryKey:true,
            autoIncrement:true
        },
        link:{
            type:DataTypes.STRING,
            allowNull:false,

        },
        description:{
            type:DataTypes.TEXT,
            allowNull:true,


        }
        


},{
    timestamps:true
})
module.exports = Post;