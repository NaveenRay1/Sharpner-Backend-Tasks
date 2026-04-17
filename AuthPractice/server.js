require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const protect = require('./middlewares/auth.middleware');
const app = express();
const sequelize = require('./config/db');

app.use(express.json());
app.get('/api/protected', protect, (req, res) => {
    res.json({message: 'you are in', user: req.user});
});
app.use('/api/auth',authRoutes);


const start = async ()=>{
    try{
        await sequelize.sync({alter:true})
        console.log('database created');
        app.listen(3000,()=>{
            console.log('server is running');
        })
    }catch(err){
        console.log(err);
    }
}

start();