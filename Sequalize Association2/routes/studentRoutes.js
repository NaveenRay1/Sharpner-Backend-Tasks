const express = require('express');
const router = express.Router();

const {Student,Course} = require('../models/index');
const{createStudent,getAllStudents,enrollStudent,getStudentCourses} = require('../controllers/studentController')

router.post('/',createStudent);
router.get('/',getAllStudents);
router.get('/:id/courses',getStudentCourses);
router.post('/enroll',enrollStudent);

module.exports = router;