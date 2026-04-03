const mysql = require('mysql2');

//once required we will createConnection
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "Naveen@1234",
    database: "bus_booking"
});

//once the connection has been created we will connect it
db.connect((err)=>{
    if(err){
        console.log("database failed to connect",err);
    }else{
        console.log("database successfully connected to mysql");
    }
});

module.exports = db;