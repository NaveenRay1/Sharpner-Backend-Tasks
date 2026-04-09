require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

// Import DB and Models
const { sequelize } = require('./models');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Middleware
app.use(cors());
// Built-in middleware to parse URL-encoded bodies from HTML forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', postRoutes);

// Sync Database and Start
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => console.log('Database connection error:', err));


