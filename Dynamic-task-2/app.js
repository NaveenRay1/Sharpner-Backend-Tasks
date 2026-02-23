const express = require('express');
const app = express();

const port = 4000;

app.use((req,res,next)=>{
    console.log(`Reques method is ${req.method} and request made to ${req.url}`);
    next();
})
app.get('/products',(req,res)=>{
    res.send('Here is the list of all products');
})
app.post('/products',(req,res)=>{
    res.send('A new product has been created');
})

app.get('/categories',(req,res)=>{
    res.send('Here is the list of all catogoy');
})
app.post('/categories',(req,res)=>{
    res.send('A new category has been created');
})

app.listen(port,()=>{
    console.log(`server is running on ${port} `);
})