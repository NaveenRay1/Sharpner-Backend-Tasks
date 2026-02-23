const express = require('express');
const app = express();
const userRouter = require('./routers/user');
const orderRouter = require('./routers/order');
const port = 4000;

app.use('/user',userRouter);
app.use('/order',orderRouter);

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})