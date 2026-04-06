const express= require('express');
const router = express.Router();
const{createCourse,getAllcourse} = require('../controllers/courseController');
// post 
router.post('/',createCourse);
router.get('/',getAllcourse);

module.exports =router;