const {Sequelize} = require('sequelize');
//firstly require it int this form then next step is create connection
require('dotenv').config();
const sequelize = new Sequelize(
    //name first
    process.env.db_name,
    process.env.db_user,
    process.env.db_pass,
    {
        host:process.env.db_host,
        dialect:'mysql'
    }
);

//connection has been created now we need to authenticate it 
sequelize.authenticate()
.then(()=>console.log('connected to database by sequelize'))
.catch((err)=>console.log('connection failed',err));

module.exports = sequelize;
