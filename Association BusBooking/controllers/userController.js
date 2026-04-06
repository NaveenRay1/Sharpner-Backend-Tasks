const {User,Bus,Booking} = require('../models/index');

const createUsers = async(req,res)=>{
    const {name,email} = req.body;
    if(!name||!email) return res.status(400).json({message:"need name and email"});
    try{
        const result = await User.create({name,email});
        console.log("succesfully created",result);
        return res.status(201).json({message:"successfully created",result});
    }
    catch(err){
        console.log("err",err);
        return res.status(500).json({message:err.message});
    }
}

const getUserBooking = async(req,res)=>{
    const userId = req.params.id;

    if(isNaN(userId))return res.status(400).json({message:"userId should be number"});
    try{
        const result = await User.findByPk(userId,{include:Booking});
        if(!result)return res.status(404).json({message:"user not found"});

        console.log("user with bookings are",result);
        return res.status(200).json({message:"all bookings of user are",data:result});
    }
    catch(err){
        console.log("err",err);
        return res.status(500).json({message:err.message});
    }
};

module.exports = {createUsers,getUserBooking};