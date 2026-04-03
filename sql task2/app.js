const express = require('express');
const db = require('./config/db');

const app = express();

app.use(express.json());
app.get('/',(req,res)=>{
res.send("Bus booking api running");
})

app.listen(3000,()=>{
    console.log('server running');
})