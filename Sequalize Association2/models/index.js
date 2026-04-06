const Student = require('../models/Student');
const Course = require('../models/Course');

Student.belongsToMany(Course,{through:'StudentCourses'});
Course.belongsToMany(Student,{through:'StudentCourses'});

module.exports = {Student,Course};