const express = require('express');
const app = express();
const studentRoute = require('./routes/student');
const courseRoutes = require('./routes/course');

//routes
app.get('/',(req,res)=>{
    res.send('Welcome');
})
app.use('/students',studentRoute);
app.use('/courses',courseRoutes);

app.use((req,res)=>{
    res.status(404).send('Page Not Found')
})
app.listen(4000,()=>{
    console.log('server is runnig');
})