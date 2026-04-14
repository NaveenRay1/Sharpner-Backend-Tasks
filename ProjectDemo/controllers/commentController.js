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



module.exports = {createComment};