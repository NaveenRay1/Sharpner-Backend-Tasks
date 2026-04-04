const express = require('express');
const db = require('./config/db');
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    console.log('student management api working');
    res.send('student management api working');

})

//so server's r working fine now let's work with routes
//post routes
app.post('/students',(req,res)=>{
    const {name,email,age} = req.body;
    if(!name || !email || !age)return res.status(400).json({message:"name ,email and age required"});
    //if got move to query
    const sql = 'INSERT INTO students (name,email, age) VALUES (?, ?, ?)';
    //NOW DB.QUERY
    db.query(sql,[name,email,age],(err,result)=>{
        if(err){
            console.log("db error",err.message);
            return res.status(500).json({msg:err.message});
        }
        console.log("successfully inserted ",result);
        return res.status(201).json({message:"successfully student is added into database",ress:result});
    });
});

// now get all
app.get('/students',(req,res)=>{
    const sql = 'SELECT * FROM students';
    db.query(sql,(err,result)=>{
        if(err){
            console.log("db err",err.message);
            return res.status(500).json({message:err.message});
        }
        if(result.length === 0){
            console.log("database is empty");
            return res.status(404).json({message:"databse is empty"});
        }
        console.log("List of all students ", result);
        res.status(200).json({message:"List of all students are", ress:result});
    });
});

//get student by id
app.get('/students/:id',(req,res)=>{
    const userId = req.params.id;
     if(isNaN(userId))return res.status(400).json({message:"id should be number"});
const sql = 'SELECT * FROM students WHERE id = ?';
db.query(sql,[userId],(err,result)=>{
    if(err){
        console.log("db err",err.message);
        return res.status(500).json({message:err.message});
    }
    if(result.length===0){
        console.log("no student found by",userId);
        return res.status(404).json({message:"no student found by this id"});
    }
    console.log("the student",result);
    return res.status(200).json({message:"the student is ",ress:result});
});
});
//put update student by id
app.put('/students/:id',(req,res)=>{

    const userId = req.params.id;
     if(isNaN(userId))return res.status(400).json({message:"id should be number"})
    const {name , email , age} = req.body;
    if(!name || !email || !age)return res.status(400).json({message:"required name,email and age"});
    //sql query
    const sql = 'UPDATE students SET name = ? , email = ? , age = ? WHERE id = ?';
    db.query(sql,[name,email,age,userId], (err,result)=>{
        if(err){
            console.log("db err",err.message);
            return res.status(500).json({message:err.message});
        }
        if(result.affectedRows === 0){
            console.log("user not found");
           return res.status(404).json({message:"user not found"});
        }
        console.log("successfully updated ",result);
        return res.status(200).json({message:"successfully updated the user", ress:result});
    });
});

//delete route
app.delete('/students/:id',(req,res)=>{
    //extract id
    const userId = req.params.id;
    if(isNaN(userId)) return res.status(400).json({message:"id should be number"})
    const sql = 'DELETE FROM students WHERE id = ?';
    db.query(sql,[userId],(err,result)=>{
        if(err){
            console.log('err db',err.message);
            return res.status(500).json({message:err.message});
        }
        if(result.affectedRows === 0){
            console.log("user not found");
            return res.status(404).json({message:"user not found"});
        }
        console.log("user deleted successfully ",result);
        return res.status(200).json({message:"user deleted successfully",ress:result});
    });
});
app.listen(3000,()=>{
    console.log("server running  ");
})