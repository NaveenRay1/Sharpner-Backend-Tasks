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
.then(()=>console.log('connected'))
.catch((err)=>console.log("err",err));

module.exports = sequelize;