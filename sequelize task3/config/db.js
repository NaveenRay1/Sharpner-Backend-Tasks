// let's make connection

const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.db_name,
    process.env.db_user,
    process.env.db_pass,
    {
        host:process.env.db_host,
        dialect:'mysql'
    }
);

//  now just create connect
sequelize.authenticate()
.then(()=>console.log("connected successfully"))
.catch((err)=>console.log("err",err));

module.exports = sequelize;

