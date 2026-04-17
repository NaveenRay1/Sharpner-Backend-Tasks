 const jwt = require('jsonwebtoken');

 const protect = (req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) return res.status(401).json({message:'no token unauthorize'});
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({message:err.message});
    }
 }

 module.exports = protect;