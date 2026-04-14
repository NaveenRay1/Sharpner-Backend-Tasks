const express = require('express');
const router = express.Router();
const {createComment} = require('../controllers/commentController');
router.post('/:postId/comments',createComment);


module.exports = router;