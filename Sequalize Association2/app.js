const express = require('express');
const sequelize = require('./config/db');

const studentRoute = require('./routes/studentRoutes');
const courseRoute = require('./routes/courseRoutes');
const app = express();

app.use(express.json());

sequelize.sync({force:false})
.then(()=>console.log("success"))
.catch((err)=>console.log("err",err));

app.use('/students',studentRoute);
app.use('/courses',courseRoute);
app.listen(3000,()=>{
    console.log('server is running');
})