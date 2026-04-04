const express = require('express');
const app = express();
const db = require('./config/db');
app.use(express.json());

//apis
app.get('/',(req,res)=>{
    res.send('Bus booking system apis working');
})



//let's start witht the most basic api's
//crud operations

//add users
app.post('/users',(req,res)=>{
    //now let me add
    const {name,email} = req.body;
    if(!name || !email)return res.status(400).json({message:"name and user are empty"});
    //get them
    const sql = 'INSERT INTO Users (name,email) VALUES (? , ?)';
    //NOW USE db.query to insert them
    db.query(sql,[name,email],(err,result)=>{
        if(err){
            console.log('cannato insert due to',err);
            return res.status(500).json({message:err.message});
        }
        console.log('INSERTED SUCCESSFULLY INTO TABLE',result);
        return res.json({message:"insertion is successful", res:result});
    });
});

//now since insert user has been done we will now do update user

app.put('/users/:id',(req,res)=>{
    const userId = req.params.id;
    //now get name and email to update
    const {name , email } = req.body;
    if(!name || !email) return res.status(400).json({message: "name and email are required"});

    //now we need to find
    const sql = "UPDATE Users SET name = ? , email = ? WHERE id = ?";
    //now db query
    db.query(sql,[name,email,userId],(err,result)=>{
        if(err){
            console.log('cant update',err);
            return res.status(500).json({message:err.message});
        }
        if(result.affectedRows === 0){
            console.log('user not found');
            return res.status(400).json({message:"user not found"});
        }
        console.log('updated successfully',result);
        return res.status(200).json({message:"successfully updated" , res:result});
    })
})
//now get all users
app.get('/users',(req,res)=>{
    //don't need anything to extract just find all users present in user table
    const sql = 'SELECT * FROM Users';
    db.query(sql,(err,result)=>{
        if(err){
            console.log("err db");
            return res.status(500).json({message:"error",msg:err.message});
        }
        //
        console.log("all users r ",result);
        res.status(200).json({message:"find all users", result:result});
    });
});
//now let's find by id
app.get('/users/:id',(req,res)=>{
    const userId = req.params.id;
    //now check if user id there or not


    const sql = 'SELECT*FROM Users WHERE id = ?';
    //now db.query
    db.query(sql,[userId],(err,result)=>{
        if(err){
            console.log("db error");
            return res.status(500).json({message:err});
        }
        if(result.length===0){
            return res.status(400).json({message:"user not found"});
        }
        console.log("user found",result);
        return res.status(200).json({message:"user found",res:result});
    });
});

//now let's do delete operations 
app.delete('/users/:id',(req,res)=>{
    //extract the id
    const userId = req.params.id;
    //now find
    const sql = 'DELETE FROM Users WHERE id = ?';
    db.query(sql,[userId],(err,result)=>{
        if(err){
            console.log("db err");
            return res.status(500).json({message:"error",res:err.message});
        }
         if(result.affectedRows === 0){
            return res.status(404).json({message: "user not found"});
        }
        console.log("deleted successfully");
        return res.status(200).json({message:"deleted successfully",res:result});
    });
});

//let's insert buses route
app.post('/buses',(req,res)=>{
    //get from the body
    const {busNumber,totalSeats,seatAvailable} = req.body;
    //now check if any empty
    if(!busNumber || !totalSeats || !seatAvailable)return res.status(400).json({message:"need number,totalseats and seat availabe"});
    //if got then push in sql
    const sql = 'INSERT INTO Buses (busNumber , totalSeats, seatAvailable) VALUES (?, ?, ?)';
    //NOW db query
    db.query(sql,[busNumber,totalSeats,seatAvailable],(err,result)=>{
        if(err){
            console.log("err",err.message);
            return res.status(500).json({message:err.message});
        }
        console.log("successfully inserted ",result);
        res.status(200).json({message:"successfully inserted", ress:result});
    });
});
//get all buses seats with specific seat available
app.get('/buses/available/:seats', (req,res)=>{
    //now get the seats number 
    const seatAvailable = req.params.seats;
    //now write query
    const sql = 'SELECT * FROM Buses WHERE seatAvailable>= ?';
    db.query(sql,[seatAvailable],(err,result)=>{
        if(err){
            console.log("errr");
            return res.status(500).json({message:err.message});
        }
        if(result.length === 0){
    return res.status(404).json({message: "no buses found with that many seats"});
}
        console.log("Busses available are ",result);
        res.status(200).json({message:"buses availabe are " ,ress: result});
    });
});
app.listen(3000,()=>{
    console.log('server is running');
})