const express = require('express');
const router = express.Router();

const {createBuses , getBusBookings} = require('../controllers/busController');

router.post('/',createBuses);
router.get('/:id/bookings',getBusBookings);

module.exports = router;