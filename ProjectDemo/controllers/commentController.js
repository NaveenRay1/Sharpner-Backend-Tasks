const { where } = require('sequelize');
const {Post,Comment} = require('../models/index');

// add comment
const createComment = async(req,res)=>{
    try{

        const postId = req.params.id;
        const post = await Post.findByPk(postId);
        if(!post)return res.status(400).json({message:'post not found'});
        const {body} = req.body;
        if(!body)return res.status(400).json({message:"need body"});
        // now add
        const result = await Comment.create({postId,body});
        console.log('comment created',result);
        return res.status(201).json({message:"comment created",data:result});

    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
    
    
}
// delete comment
// so since all comments id r unique we just need comment id
const deleteComment = async(req,res)=>{
    try{
        const id = req.params.id;
        const isDelete =await Comment.destroy({where:{id:id}});
        if(isDelete===0)return res.status(404).json({message:'comment not found'});
        console.log('comment succesfully deleted');
        return res.status(200).json({message:'comment deleted',data:isDelete});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
}






module.exports = {createComment,deleteComment};