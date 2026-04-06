const express = require('express');
const router = express.Router();
const {createUsers,getUserBooking} = require('../controllers/userController');

router.post('/',createUsers);
router.get('/:id/bookings',getUserBooking);

module.exports = router;