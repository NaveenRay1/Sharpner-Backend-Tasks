//so let's config the database for sql we require mysql2
const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');
//now we create connection
const db = mysql.createConnection({
    //here we write all the things require for the connection
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});

//after getting this we connect
db.connect((err)=>{
    if(err){
        console.log('databse failed to connect',err);
    }
    else{
        console.log('database successfully connected to mysql');
    }
});

module.exports = db;

//database connection is setup
//now let's setup schema's for now
