const express = require('express');
const router = express.Router();
const {createPost ,getUserPost} = require('../controllers/postController');

// create post routes
router.post('/posts',createPost);
router.get('/users/:id/posts', getUserPost);

module.exports = router;