const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequileze = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host:process.env.DB_HOST,
        dialect:'mysql'
    }
);

sequileze.authenticate()
.then(()=>console.log('connected'))
.catch((err)=>console.log('err'));

module.exports = sequileze;