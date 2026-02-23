const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Notice the path here expects :userId to match the controller logic
router.get('/:userId', cartController.getCartForUser);
router.post('/:userId', cartController.addProductToCart);

module.exports = router;