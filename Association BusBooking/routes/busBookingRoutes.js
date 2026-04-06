const express = require('express');
const router = express.Router();
const {createBookings} = require('../controllers/bookingController');
router.post('/',createBookings);

module.exports = router;