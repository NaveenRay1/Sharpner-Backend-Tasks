const {Sequelize} = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(
    process.env.dbName,
    process.env.dbUser,
    process.env.dbPass,
    {
        host:process.env.dbHost,
        dialect:'mysql'
    }
);

sequelize.authenticate()
.then(()=>console.log("successfully connected"))
.catch((err)=>console.log("failed",err));

module.exports = sequelize;