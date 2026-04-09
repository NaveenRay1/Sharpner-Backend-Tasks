const { Post, Comment } = require('../models');

// Get all posts and render the index view
exports.getIndex = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [Comment],
            order: [['createdAt', 'DESC']]
        });
        res.render('index', { posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { imageUrl, description } = req.body;
        await Post.create({ imageUrl, description });
        res.redirect('/'); // Refresh page by redirecting home
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to create post');
    }
};

// Add a comment to a specific post
exports.addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { postId } = req.params;
        await Comment.create({ text, PostId: postId });
        res.redirect('/'); // Refresh page by redirecting home
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to add comment');
    }
};