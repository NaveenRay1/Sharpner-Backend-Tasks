const express = require('express');
const sequelize = require('./config/db');
const app = express();
const {Post,Comment} = require('./models/index');
app.use(express.json());


app.get('/',(req,res)=>{
res.send('woriking');
})

const start = async()=>{
    try{
        await sequelize.sync({alter:true})
        console.log('database connected')
        app.listen(3000,()=>{
        console.log('server is running');
})
    }
    catch(err){
        console.log('err',err);
    }
}

start();
