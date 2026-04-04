const express = require('express');
const sequelize = require('./config/db');
const Student = require('./models/students');
const app = express();

app.use(express.json());



//lets create table of that model
sequelize.sync({force:false})
.then(()=>console.log('table created successfully'))
.catch((err)=>console.log('error',err));
app.get('/',(req,res)=>{
    console.log('sequelize testing');
    res.send('sequelize testing');
})
//

app.listen(3000,()=>{
    console.log('server is running');
})

//now setup db connection 