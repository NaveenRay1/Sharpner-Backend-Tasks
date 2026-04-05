const express = require('express');
const Users = require('./models/Users');
const app = express();
const sequelize = require('./config/db');

app.use(express.json());
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.send('api is working');
})

sequelize.sync({force:false})
.then(()=>console.log("database is successfully connected"))
.catch((err)=>console.log("databse is failed to connected",err));
// inserting users
app.post('/users',async (req,res)=>{
    const {name , phoneNumber , email} = req.body;
    if(!name || !phoneNumber|| !email)return res.status(400).json({message:"need name,phoneNumber and email"});

    try{
        const result =await Users.create({name,phoneNumber,email});
        console.log("User inserted successfully",result);
        return res.status(201).json({message:"User inserted successfull",ress:result});
    }
    catch(err){
        console.log("err in db",err);
       return res.status(500).json({message:"err",errr:err});
    }
})
// get all users 
app.get('/users',async (req,res)=>{
   
    try{
         const result = await Users.findAll();
        if(result.length ===0)return res.status(404).json({message:"No user found"});
        console.log("list of all users are",result);
        return res.status(200).json({message:"list of all users are", data:result});
    }
    catch(err){
        console.log("err",err);
        return res.status(500).json({message:"err",errr:err});
    }
});
// delete rout
app.delete('/users/:id',async(req,res)=>{
    const userId = req.params.id;
    if(isNaN(userId))return res.status(400).json({message:"id should be a number"});
    try{
    const result = await Users.destroy({
        where: {id:userId}
    })
    if(result===0)return res.status(404).json({message:"user not found"});
    console.log("user deleted successfully",result);
    return res.status(200).json({message:"user deleted successfully", ress:result});
    }
    catch(err){
        console.log("err",err);
        return res.status(500).json({message:"err", errr:err});
    }
});
app.listen(3000,()=>{
    console.log('surver is running');
})