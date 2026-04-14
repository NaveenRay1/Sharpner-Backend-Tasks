const {DataTypes} = require('sequelize');

const sequelize = require('../config/db');

const Post = require("./Post");
const Comment = require('./Comment');

// now define relations

Post.hasMany(Comment,{foreignKey:'postId',onDelete:'CASCADE',hooks:true});
Comment.belongsTo(Post,{foreignKey:'postId'});

module.exports = {Post,Comment};