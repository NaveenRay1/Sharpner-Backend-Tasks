const express = require('express');

const app = express();
const sequelize = require('./config/db');
const Student = require('./models/Students');
app.use(express.json());

app.get('/',(req,res)=>{
    console.log('working');
    res.send('api working');
})

sequelize.sync({force:false})
.then(()=>console.log('connected successfully'))
.catch((err)=>console.log('cant connect ',err));

// route to post
app.post('/students',async (req,res)=>{
    const {name , email} = req.body;
    // check
    if(!name || !email)return res.status(400).json({message:"need name and email"});
    try{
        const student = await Student.create({name,email});
        console.log('successfully inserted', student);
        return res.status(201).json({message:"inserted successfully", ress:student});
    }
    catch(err){
        console.log('err db',err.message);
        return res.status(500).json({message:err.message});
    }
});
// now we do updating
app.put('/students/:id',async (req,res)=>{
    const userId = req.params.id;
    if(isNaN(userId)) return res.status(400).json({message:"id should be number"});
    const {name , email} = req.body;
    if(!name || !email)return res.status(400).json({message:"need name and email"});

    //now if we got both then store the updated result in updated array
    try{
        const [update] = await Student.update(
       {name , email},
       {where : {id:userId}}
    );
    if(update ===0)return res.status(400).json({message:"Student not found"});
    console.log("updated successfully");
    res.status(201).json({message:"Student updated successfully"});

}catch(err){
    console.log("err db",err.message);
    res.status(500).json({message:"error",ress:err});
}
});

// now delete 
// DELETE - delete student
app.delete('/students/:id', async (req, res) => {
    const userId = req.params.id;
    if(isNaN(userId)) return res.status(400).json({ message: "id must be a number" });

    try {
        const deleted = await Student.destroy({ where: { id: userId } });
        if(deleted === 0) return res.status(404).json({ message: "student not found" });
        console.log("deleted successfully");
        return res.status(200).json({ message: "student deleted successfully" });
    } catch(err) {
        console.log("db error", err.message);
        return res.status(500).json({ message: err.message });
    }
});



app.listen(3000,()=>{
    console.log('server is runnig');
})

