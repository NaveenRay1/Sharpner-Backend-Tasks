const {Student,Course} = require('../models/index');

const createCourse = async(req,res)=>{
    // get details 
    const {courseName,description } = req.body;
    if(!courseName || !description)return res.status(400).json({message:'not found'});
    try{
        const result =await Course.create({courseName,description});
        console.log("succesfully inserted",result);
        return res.status(201).json({message:"inserted", data:result});

    }
    catch(err){
        console.log("err",err);
        return res.status(500).json({message:err.message});
    }
};

const getAllcourse = async(req,res)=>{
    try{
        const result = await Course.findAll();
        if(result.length===0)return res.status(404).json({message:"not found course"});
        console.log("list of all course",result);
        return res.status(200).json({message:"List of course",data:result});
    }
    catch(err){
        console.log("err",err);
        return res.status(500).json({message:err.message});
    }
};

module.exports = {createCourse,getAllcourse};