const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    res.send('List of all orders');
})
router.post('/',(req,res)=>{
    res.send('New order created');
})

module.exports = router;