const express = require('express');
const {Post, User} = require('./models/index');
const sequelize = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const app = express();
app.use(express.json());

sequelize.sync({force:false})
.then(()=>console.log("succcess"))
.catch((err)=>console.log("err",err));
// app.post('/users', async (req, res) => {
//     const { name, email } = req.body;
//     if(!name || !email) return res.status(400).json({message: "name and email required"});
//     try {
//         const user = await User.create({ name, email });
//         return res.status(201).json({message: "user created", data: user});
//     } catch(err) {
//         return res.status(500).json({message: err.message});
//     }
// });
app.use('/',postRoutes);

app.listen(3000,()=>{
    console.log("running server");
})