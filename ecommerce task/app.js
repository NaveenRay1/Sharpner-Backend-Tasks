const express = require('express');
const app = express();

// Import all your routers
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Connect routers to base URL paths
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Custom 404 (always a good practice)
app.use((req, res) => {
    res.status(404).send("Page not found");
});

app.listen(4000, () => {
    console.log("E-commerce API is running on port 4000");
});