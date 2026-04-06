// sicne we r writing the logic we need databse

const {Student,Course} = require('../models/index');

const createStudent = async(req,res)=>{
    // first got the name and email from the body
    const {name,email} = req.body;
    if(!name || !email)return res.status(400).json({message:"name and email needed"});
    // now go for try and catch
    try{
        const result = await Student.create({name,email});
        console.log("created successfully",result);
        return res.status(201).json({message:"created succesfully",data:result});
    }
    catch(err){
        console.log("err",err);
        return res.status(500).json({message:err.message});
    }
}
const getAllStudents = async(req,res)=>{
    try{
        const result = await Student.findAll();
        if(result.length===0)return res.status(404).json({message:"Student not found"})
            console.log("List of all students are",result);
        return res.status(200).json({message:"list of students",data:result});
    }
    catch(err){
        console.log("err",err);
        return res.status(500).json({message:err.message});
    }
};

// enroll student
const enrollStudent = async(req,res)=>{
    const{studentId,courseId} = req.body;
    if(isNaN(studentId) || isNaN(courseId) || !studentId ||!courseId)return res.status(400).json({message:"need studentid and courseid and should be number"});
    try{
        // find student
        const student = await Student.findByPk(studentId);
        if(!student)return res.status(404).json({message:"Student not found"});
        const course = await Course.findByPk(courseId);
        if(!course)return res.status(404).json({message:"course not found"});
        const result =await student.addCourse(course);
        console.log("succesfully enrolled");
        res.status(200).json({message:"enrolled",data:result});
    }
    catch(err){
        console.log('err',err);
        return res.status(500).json({message:err.message});
    }
};

// get courses of particular studen
const getStudentCourses = async(req,res)=>{
    const userId = req.params.id;
    if(isNaN(userId))return res.status(400).json({message:"id must be number"});
    try{
        const result = await Student.findByPk(userId,{include:Course});
        if(!result)return res.status(404).json({message:"student not found"});
        console.log("student with course",result);
        return res.status(200).json({message:"courses of student is",data:result});

    }
    catch(err){
        console.log("err",err.message);
        return res.status(500).json({message:err.message});
    }
}
module.exports = {createStudent,getAllStudents,enrollStudent,getStudentCourses};