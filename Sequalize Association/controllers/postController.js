
const { User, Post } = require('../models/index');

const createPost = async (req, res) => {
    const { title, body, userId } = req.body;
    if(!title || !body || !userId) 
        return res.status(400).json({message: "title, body and userId required"});

    try {
        const user = await User.findByPk(userId);
        if(!user) return res.status(404).json({message: "user not found"});

        const result = await Post.create({ title, body, userId });
        console.log("post created successfully", result);
        return res.status(201).json({message: "post created successfully", data: result});
    } catch(err) {
        console.log("err", err);
        return res.status(500).json({message: err.message});
    }
};
const getUserPost = async (req,res)=>{
    const userId = req.params.id;
    if(isNaN(userId))return res.status(400).json({message:"id should be number"});
    // now try
    try{
       const user = await User.findByPk(userId,{include:Post});
       if(!user) return res.status(404).json({message:"user not found"});
       console.log("User with posts",user);
       return res.status(200).json({message:"user with posts",data:user});
    }
    catch(err){
        console.log("err",err);
        return res.status(500).json({message:err.message});
    }
};
module.exports = { createPost ,getUserPost};