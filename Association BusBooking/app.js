const express = require('express');
const sequelize = require('./config/db');
const {User,Bus,Booking} = require('./models/index');
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/busBookingRoutes');
const app = express();

app.use(express.json());

sequelize.sync({force:false})
.then(()=>console.log("connected"))
.catch((err)=>console.log("err",err));

app.use('/users',userRoutes);
app.use('/buses',busRoutes);
app.use('/bookings',bookingRoutes);
app.listen(3000,()=>{
    console.log("server is running");
})