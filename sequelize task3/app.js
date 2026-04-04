const express = require('express');
const sequelize = require('./config/db');
const Users = require('./models/Users');
const Buses = require('./models/Buses');
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('api working');
})
sequelize.sync({force:false})
.then(()=>console.log("successfully created"))
.catch((err)=>console.log("err", err));

//let's create the post routes for both users and bus
app.post('/users',async (req,res)=>{
    const {name , email , age} = req.body;
    if(!name || !email || !age)return res.status(400).json({message:"need name,email and age"});
    //if not then direclty store it
    try{
    const result = await Users.create({name,email,age});
        console.log("inserted successfully",result);
        return res.status(201).json({message:"inserted successfully",ress:result});
    }catch(err){
        console.log("err db",err);
        return res.status(500).json({message:err.message});
    }
});
//now insert for bus
app.post('/buses',async (req,res)=>{
    const {busNumber , totalSeats, seatAvailable} = req.body;
    if(!busNumber || !totalSeats || !seatAvailable) return res.status(400).json({message:"need busNumber,totalSeats and seatAvailabe"});
    try{
        const result = await Buses.create({busNumber,totalSeats,seatAvailable});
        console.log("successfully inserted",result);
        return res.status(201).json({message:"successfully inserted",ress:result});
    }catch(err){
        console.log("err db",err);
        return res.status(500).json({message:"err",errr:err});
    }
});
// get all users from data
app.get('/users',async(req,res)=>{
    try{
        const result = await Users.findAll();
        if(result.length===0)return res.status(404).json({message:"no user present"});
        console.log('all users',result);
        return res.status(200).json({message:"all users are", ress:result});
    }catch(err){
        console.log("err",err);
        return res.status(500).json({message:"err db", ress:err});
    }
});
//get busses according to seat availability
app.get('/buses/:seats',async (req,res)=>{
    const seats = req.params.seats;

    if(isNaN(seats))return res.status(400).json({message:"seats should be number"});
    try{
    const { Op } = require('sequelize');
const result = await Buses.findAll({ where: { seatAvailable: { [Op.gte]: seats } } })
    if(result.length===0)return res.status(404).json({message:"no buses present"});
    console.log('buses with availables seats are',result);
    return res.status(200).json({message:"all buses with availble seats ",ress:result});
    } catch(err){
        console.log('err',err);
        return res.status(500).json({message:"err", ress:err});
    }

})
app.listen(3000,()=>{
    console.log("server running");
})
