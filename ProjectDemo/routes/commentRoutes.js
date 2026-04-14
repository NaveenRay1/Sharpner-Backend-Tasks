const express = require('express');
const router = express.Router();
const {createComment,deleteComment,getAllComment} = require('../controllers/commentController');
router.post('/:id/comments',createComment);
router.delete('/comments/:id',deleteComment);

module.exports = router;