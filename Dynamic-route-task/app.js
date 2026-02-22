const express = require('express');
const app = express();
const port = 3000;


app.get('/welcome/:user',(req,res)=>{
    const userName = req.params.user;

    // now get from query
    const role = req.query.role || "Guest";
    res.send(`Welcome ${userName} your role is ${role}`);
})

app.listen(port,()=>{
    console.log('Server running');
})