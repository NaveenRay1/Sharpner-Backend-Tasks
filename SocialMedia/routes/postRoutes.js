const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/', postController.getIndex);
router.post('/posts', postController.createPost);
router.post('/posts/:postId/comments', postController.addComment);

module.exports = router;