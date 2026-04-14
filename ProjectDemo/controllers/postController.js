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

const getAllPosts = async(req,res)=>{
    // here we r going to write all posts logic 
    try{
        const result = await Post.findAll({include:Comment});
        if(result.length===0)return res.status(404).json({message:"no posts yet"});
        console.log('All posts are',result);
        return res.status(200).json({message:'list of all posts',data:result});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({err:err.message});
    }
};

const deletePost = async(req,res)=>{
    // get id
    try{
    const postId = req.params.id;
        // now since we r deleting we don't need anything ok for eg let's find if this post even exists or not
        const result = await Post.findByPk(postId);
        if(!result)return res.status(404).json({message:"posts not found"});
        // if post found
        // delete
        const isDeleted = await Post.destroy({where:{id:postId}});
        console.log('post is permanent deleted',isDeleted);
        return res.status(200).json({message:'post is deleted',data:isDeleted});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
};

module.exports = {createPost,getAllPosts,deletePost};