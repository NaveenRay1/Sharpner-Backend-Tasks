const express = require('express');
const app = express();
const port = 4000;

app.get('/products',(req,res)=>{
    res.send('Here is the list of all products');
})

app.post('/products',(req,res)=>{
    res.send('A new product has been created');
})

app.get('/categories',(req,res)=>{
    res.send('Here is the list of all categories');
})

app.post('/categories',(req,res)=>{
    res.send('A new category has been created');
})

app.use((req, res) => {
    res.status(404).send('<h1>404 page not found</h1>');
});

app.listen(port, ()=>{
    console.log('server is running');
})