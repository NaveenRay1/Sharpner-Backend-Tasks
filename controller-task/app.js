const express = require('express');
const app = express();
const PORT = 4000;

// 1. Import your Route files
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Optional but recommended: Middleware to parse JSON bodies 
// (Useful for when you start sending actual data in POST requests)
app.use(express.json());

// 2. Connect the routes to their base URLs
// This means any URL starting with '/users' goes to userRoutes, etc.
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// 3. Custom 404 Handler (Always put this AFTER your routes)
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// 4. Start the server
app.listen(PORT, () => {
    console.log(`E-Commerce API is running on http://localhost:${PORT}`);
});