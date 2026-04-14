const express = require('express');
const sequelize = require('./config/db');
const app = express();

const postRoute = require('./routes/postRoutes');
const commentRoute = require('./routes/commentRoutes');
app.use(express.json());


app.use('/posts',postRoute);
app.use('/posts',commentRoute);
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
