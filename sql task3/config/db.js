const mysql = require('mysql2');

//now create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Naveen@1234",
    database:"bus_booking1"
});

db.connect((err)=>{
    if(err){
        console.log("failed to connect database", err);
    }else{
        console.log("database connected successfully");
    }
})

module.exports = db;