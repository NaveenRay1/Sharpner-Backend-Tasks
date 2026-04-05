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

// connection done just connect
sequelize.authenticate()
.then(()=> console.log("connection successful"))
.catch((err)=>console.log("error occur",err));

module.exports = sequelize;