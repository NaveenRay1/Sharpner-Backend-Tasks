
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const registerUser = async(req,res)=>{
    try{
        const {username,email,password} = req.body;

        // will use validtors bt for now let's write simple logic
        const existUser = await User.findOne({where:{email:email}});
        if(existUser)return res.status(400).json({message:'user already exist'});
        // else hash pass and create
        const hashedPass = await bcrypt.hash(password,10);

        const result = await User.create({username,email,password:hashedPass});
        const {password:_,...userData} = result.dataValues;
        console.log('user registered',userData);
        return res.status(201).json({message:'user registered',data:userData});

    }catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
};

const loginUser = async(req,res)=>{
    try{
        // get username and password
        const {username,password} = req.body;
        // validators from middleware. u will tell me right>
        // now find user with username then we will compare

        const user = await User.findOne({where:{username:username}});
        if(!user)return res.status(400).json({message:'username or password is wrong'});
        // if find match is using bcryp
        const match = await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json({message:'username or password is wrong'});
        // else matched then logged him in and return that webtocken with cookies that will u tell me 
        const token = jwt.sign(
            {
                id:user.id,
                email:user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn:'1d'
            }
        )
        return res.status(200).json({message:'logged in successfully',token:token});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
}

module.exports = {registerUser,loginUser};

