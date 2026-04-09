const express = require('express');
const router = express.Router();
const {getHomePage,createTable, getTableData, insertRecord} = require('../controllers/tableController')
router.get('/',getHomePage);
router.get('/create-table', (req, res) => {
    res.render('create-table.ejs');
});
router.post('/create-table',createTable);
router.get('/table/:tableName',getTableData);
// Route to handle inserting a record
router.post('/table/:tableName/insert', insertRecord);
module.exports = router;