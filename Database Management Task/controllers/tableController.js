const sequelize = require('../config/db');

const getHomePage = async (req, res) => {
    try {
        const [tables] = await sequelize.query('SHOW TABLES');
        res.render('index', {
            tables: tables,
            dbName: process.env.dbName,
            selectedTable: null, // No table selected initially
            columns: [],         
            records: []
        });
    } catch (err) {
        console.log('err', err);
        return res.status(500).json({ message: err.message });
    }
}

// NEW: Fetch data for a specific table
const getTableData = async (req, res) => {
    try {
        const tableName = req.params.tableName;

        // 1. Get tables for the sidebar
        const [tables] = await sequelize.query('SHOW TABLES');
        
        // 2. Get columns for the table headers
        const [columns] = await sequelize.query(`DESCRIBE ${tableName}`);
        
        // 3. Get the actual rows of data
        const [records] = await sequelize.query(`SELECT * FROM ${tableName}`);

        // Render the same index page, but with data this time!
        res.render('index', {
            tables: tables,
            dbName: process.env.dbName,
            selectedTable: tableName,
            columns: columns,
            records: records
        });
    } catch (err) {
        console.log('Error fetching table data:', err);
        return res.status(500).json({ message: err.message });
    }
}
const createTable = async(req,res)=>{
    try{
         const {tableName , fields} = req.body; 
         if(!tableName || !fields ||fields.length === 0) return res.status(400).json({message:"need table name and fields"});
        //  firstly write query
        let column = `id INT AUTO_INCREMENT PRIMARY KEY`;
        // NOW TRAVERSE THE FIELDS TO GET THEIR NAME OR TYPE
        for(let field of fields){
            column+=`,${field.name} ${field.type}`;
        }
          column += `, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP`;
        column += `, updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`;

        // finaly query
        const sql = `CREATE TABLE ${tableName} (${column})`;
        const result = await sequelize.query(sql);
        res.status(201).json({message:"created",query:sql,result:result});


    }
    catch(err){
        console.log('err',err);
        return res.status(500).json({message:err.message});
    }
   

    
}

// NEW: Insert a record into a specific table
const insertRecord = async (req, res) => {
    try {
        const tableName = req.params.tableName;
        const data = req.body; // Gets all the input fields from the form

        // Extract column names and format values for SQL
        const columns = Object.keys(data).join(', ');
        // Wrap values in single quotes for SQL syntax
        const values = Object.values(data).map(val => `'${val}'`).join(', '); 

        const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
        await sequelize.query(sql);

        // Refresh the page to show the new data
        res.redirect(`/table/${tableName}`);
    } catch (err) {
        console.log('Error inserting record:', err);
        return res.status(500).json({ message: err.message });
    }
}
// NEW: Delete a specific record
const deleteRecord = async (req, res) => {
    try {
        const tableName = req.params.tableName;
        const recordId = req.params.id;

        // Run the delete query using the record's unique ID
        const sql = `DELETE FROM ${tableName} WHERE id = ${recordId}`;
        await sequelize.query(sql);

        // Refresh the page to show the updated table
        res.redirect(`/table/${tableName}`);
    } catch (err) {
        console.log('Error deleting record:', err);
        return res.status(500).json({ message: err.message });
    }
}


module.exports = { getHomePage, createTable, getTableData, insertRecord, deleteRecord };