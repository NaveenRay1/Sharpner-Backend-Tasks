const express = require('express');
const path = require('path'); // 1. Import the built-in path module
const app = express();
const PORT = 3000;

// 2. Add the GET endpoint requested in the deliverables
app.get('/api/products', (req, res) => {
    
    // 3. Use res.sendFile to serve the HTML file
    // __dirname is a special variable that gets the current folder's path
    // path.join safely glues the folder names together
    const filePath = path.join(__dirname, 'VIEW', 'products.html');
    
    res.sendFile(filePath);
});

// 4. Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 