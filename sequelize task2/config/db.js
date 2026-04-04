// now we will connect db here so how we will do it first destructure Sequelize
const {Sequelize} = require('sequelize');
// after extracting require dotenv
require('dotenv').config();
// now we can use env things herre
// create connection 
 
const sequelize = new Sequelize(
    // database name first
    process.env.db_name,
    // root
    process.env.db_user,
    // pass
    process.env.db_pass,
    {
        // host
        host:process.env.db_host,
        dialect: 'mysql'
    }
);

// connection is done now authenticate
sequelize.authenticate()
.then(()=>console.log("connected successfully"))
.catch((err)=>console.log('err',err));

module.exports = sequelize;