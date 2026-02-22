
const express = require('express');
const app = express();
const port = 3000;


//let's create a custom middleware
app.use((req , res , next)=>{
  req.user = "Guest";
  console.log("middleware applied user set to guest");
  next();
})
//route
app.get('/Welcome',(req,res)=>{
    res.send(`Welcome ${req.user}`);
})
app.listen(port,()=>{
    console.log("server is running");
})

