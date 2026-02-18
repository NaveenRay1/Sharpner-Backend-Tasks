//steps to create express server
//first require it most important
const express = require('express');
const app = express();
const port = 3000;
app.listen(port,()=>{
    console.log(`Server is up and running on port ${port}! ready to handle requests.`);
})