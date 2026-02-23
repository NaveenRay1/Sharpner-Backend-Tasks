const express = require('express');

router = express.Router();

router.get('/',(req,res)=>{
    res.send('Here is the list of all users');
})
router.get('/profile',(req,res)=>{
    res.send('this is the profile section');
})

module.exports = router;