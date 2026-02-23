const express = require('express');
const router = express.Router(); // Initialize the Router

// 1. GET /books - Fetch all books
router.get('/', (req, res) => {
    console.log("Fetching book list..."); // Logic requirement
    res.send("Here is the list of books!"); // Deliverable 2
});

// 2. POST /books - Add a new book
router.post('/', (req, res) => {
    // In a real app, you'd use req.body here
    console.log("New book data received!"); // Logic requirement
    res.send("Book has been added!"); // Deliverable 2
});

module.exports = router; // Export for app.js