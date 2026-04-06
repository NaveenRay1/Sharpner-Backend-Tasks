const {User,Bus,Booking} = require('../models/index');

const createBookings = async(req,res)=>{
    const {userId,busId,seatNumber} = req.body;
    if(!userId || !busId || !seatNumber)return res.status(400).json({message:"field can't be empty"});
    if(isNaN(userId) || isNaN(busId) ||isNaN(seatNumber))return res.status(400).json({message:"userId and busId should be number"});
    try{
        const user = await User.findByPk(userId);
if(!user) return res.status(404).json({message: "user not found"});

const bus = await Bus.findByPk(busId);
if(!bus) return res.status(404).json({message: "bus not found"});

        const result = await Booking.create({userId,busId,seatNumber});
        console.log("inserted",result);
        return res.status(201).json({message:"booking created",data:result});

    }
    catch(err){
        console.log("err");
        return res.status(500).json({err:err.message});
    }
}

module.exports = {createBookings};