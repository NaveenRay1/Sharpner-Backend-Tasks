const {Post , Comment} = require('../models/index');

const createPost = async (req,res)=>{

        try{
            // get data from body 
            const {link , description} = req.body;
            // should not be empty
            if(!link || !description)return res.status(400).json({message:"need link and description"});
            // if got both we will send them
            const result = await Post.create({link,description});
            console.log('Post created',result);
            return res.status(201).json({message:'post created', result:result});
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message:err.message});
        }
}
// let's check this in postman

module.exports = {createPost};