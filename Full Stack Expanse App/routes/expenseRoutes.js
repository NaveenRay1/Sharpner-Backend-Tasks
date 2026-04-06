const express = require('express');
const router = express.Router();

const {createExpenses,getAllExpenses,deleteExpenses,updateExpenses} = require('../controllers/expenseController');

router.post('/',createExpenses);
router.get('/',getAllExpenses);
router.delete('/:id',deleteExpenses);
router.put('/:id',updateExpenses);

module.exports = router;