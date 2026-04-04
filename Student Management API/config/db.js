const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');

const db = mysql.createConnection({

    host:process.env.db_host,
    user: process.env.db_user,
    database:process.env.db_name,
    password:process.env.db_pass

}
   
);
//now connec
db.connect((err)=>{
    if(err){
        console.log("database failed to connect",err);

    }else{
        console.log("database connected successfully");
    }
});

module.exports = db;

