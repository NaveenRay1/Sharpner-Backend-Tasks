const sequelize = require('../config/database');
const Post = require('./Post');
const Comment = require('./Comment');

// Define Relationships
Post.hasMany(Comment, { onDelete: 'CASCADE' });
Comment.belongsTo(Post);

module.exports = { sequelize, Post, Comment };