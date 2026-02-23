const express = require('express');

const router = express.Router();
const {students} = require('../data');
router.get('/',(req,res)=>{
//logic to get all students using map function
const names = students.map(s=>s.name).join(", ");
res.send(`Students: ${names}`);

})
router.get('/:id',(req,res)=>{
    //first get the id 
    const id = req.params.id;
    //now write logic to find that particular student from data
    const Student = students.find(s => s.id === parseInt(id));
    if(Student)res.send(`Student : ${Student.name}`);
    else res.send('Student not found');
})
module.exports = router;