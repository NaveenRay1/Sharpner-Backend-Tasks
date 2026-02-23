const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Connect the path to the controller logic
router.get('/', userController.getAllUsers);
router.post('/', userController.addUser);
router.get('/:id', userController.getUserById);

module.exports = router;