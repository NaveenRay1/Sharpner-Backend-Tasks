const User = require('./User');
const Post = require('./Post');

//import all the models here since here we will define the relations ships and that is relataion one to many and many to one all these
// define association/relation

// user to post
User.hasMany(Post,{foreignKey:'userId'});
Post.belongsTo(User,{foreignKey:'userId'});

module.exports = {User,Post};