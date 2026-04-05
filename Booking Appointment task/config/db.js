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

// now just authenticate it 
sequelize.authenticate()
.then(()=>console.log("connected successfully"))
.catch((err)=>console.log("error occour",err));

//export
module.exports = sequelize;