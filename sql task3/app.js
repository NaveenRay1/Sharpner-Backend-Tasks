const express = require('express');
const app = express();
const db = require('./config/db');

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("bus bookin api working");
})

app.listen(3000,()=>{
    console.log('server is running');
})

app.post('/users',(req,res)=>{
    //now we will insert the data into database
    const {name, email} = req.body;
    //got them now use sql query string
    const sql = "INSERT INTO Users (name , email) VALUES (? , ?)";
    //NOW CALL .QUERY INBUILT FUNCTION;
    db.query(sql,[name,email],(err,result)=>{
        if(err){
            console.log("data cannot be inserted",err);
            res.status(500).json({error:err.message});
        }
        else{
            console.log("successfully inserted",result);
            res.json({message:"user added successfully ",id:result.insertId});
        }
    });
});
//so insert is done let's go for update now 
app.put('/users/:id',(req,res)=>{
    //now extract id
    const userId = req.params.id;
    const {name,email} = req.body;
    //now we need to write the query
    const sql = "UPDATE Users SET name = ?, email = ? WHERE id = ?";
    db.query(sql,[name,email,userId],(err,result)=>{
        if(err){
            console.log("error updating",err);
            return res.status(500).json({error:err.message});

        }
        if(result.affectedRows ===0){
            return res.status(400).json({message:"user not found"});
        }
        console.log("succesfully updated",result);
        res.json({message:"user updated successfully"});
    });
});

//now update is done we need some deleting and finding i think
app.delete('/users/:id',(req,res)=>{
    const userId = req.params.id;
    //got the id now delete it
    const sql = "DELETE FROM Users WHERE id = ? ";
    db.query(sql,[userId],(err,result)=>{
        if(err){
            console.log("deletion error",err);
            return res.status(500).json({message:err.message});
        }

        if(result.affectedRows===0){
            console.log("no data found with this id");
            return res.status(400).json({message:"user not found"});
        }
        console.log("deleted successfully",result);
        return res.json({message:"User deleted"});
    });
});