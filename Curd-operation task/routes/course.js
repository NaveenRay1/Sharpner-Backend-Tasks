const express = require('express');

const router = express.Router();
const {courses} = require('../data');
router.get('/',(req,res)=>{
    //logic to get all courses
    const course = courses.map(s=>s.name);
    res.send(course);
})

router.get('/:id',(req,res)=>{
    //first get course id from req.params
    const id = req.params.id;
    const course = courses.find(s => s.id === parseInt(id));
    if(course)res.send(`Course is ${course.name}`);
    else res.send('course not found');
})

module.exports = router;