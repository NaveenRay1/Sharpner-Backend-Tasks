const express = require('express');
const Expense = require('./models/Expense');
const expenseRoute = require('./routes/expenseRoutes');
const sequelize = require('./config/db');

const app = express();
app.use(express.json());
app.use(express.static('public')); // ← serves HTML/CSS/JS files

sequelize.sync({force:false})
.then(()=>console.log("successfully connected"))
.catch((err)=>console.log("err",err));

app.use('/expenses',expenseRoute);

app.listen(3000,()=>{
     console.log('server is running');
});