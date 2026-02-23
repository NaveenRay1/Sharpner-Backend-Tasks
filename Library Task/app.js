const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes'); // Import the router

const PORT = 3000;

// Middleware to parse JSON (optional but helpful for POST data)
app.use(express.json());

// Use the book router and prefix all routes with '/books'
app.use('/books', bookRoutes); 

app.listen(PORT, () => {
    console.log(`Library Server is running on http://localhost:${PORT}`);
});