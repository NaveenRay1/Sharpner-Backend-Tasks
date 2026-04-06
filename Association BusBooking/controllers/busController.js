const {User,Bus,Booking} = require('../models/index');

const createBuses = async(req,res)=>{
    const {busNumber,totalSeats,availableSeats} = req.body;
    if(!busNumber|| !totalSeats||!availableSeats)return res.status(400).json({message:"need all fields"});
    try{
        const result = await Bus.create({busNumber,totalSeats,availableSeats});
        console.log("inserted");
        return res.status(201).json({message:"created bus",data:result});
    }
    catch(err){
        console.log("err",err);
        return res.status(500).json({message:err.message});
    }
};

const getBusBookings = async(req,res)=>{
    const busId = req.params.id;
    if(isNaN(busId))return res.status(400).json({message:"id should be number"});
    try{
        
        const result = await Bus.findByPk(busId,{include:Booking});
        if(!result)return res.status(404).json({message:"bus not found"});
        console.log("buses with all bookings",result);
        return res.status(200).json({message:"bus with all its bookings",data:result});
    }
    catch(err){
        console.log("err",err);
        return res.status(500).json({message:err.message});
    }
};

module.exports = {createBuses , getBusBookings};