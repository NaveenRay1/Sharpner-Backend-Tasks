const express = require('express');
const mysql = require('mysql2/promise'); // Using promises for cleaner code

const app = express();
app.use(express.json()); // Allows the server to read JSON data

const PORT = 3000;

// 1. Database Configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Naveen@1234', 
    database: 'test_db'
};

// 2. Initialize Database and Start Server
async function startServer() {
    try {
        // Create connection
        const connection = await mysql.createConnection(dbConfig);
        console.log(' Connected to MySQL Database.');

        // 3. Create Table automatically if it doesn't exist
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL
            );
        `;
        await connection.execute(createTableQuery);
        console.log('Table "users" is verified/created.');

        // 4. Example Route: Get all users
        app.get('/users', async (req, res) => {
            try {
                const [rows] = await connection.execute('SELECT * FROM users');
                res.json(rows);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        // 5. Example Route: Add a user
        app.post('/add-user', async (req, res) => {
            const { name, email } = req.body;
            try {
                const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
                await connection.execute(query, [name, email]);
                res.status(201).send('User added successfully!');
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error(' Database connection failed:', error.message);
    }
}

startServer();