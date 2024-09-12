const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.getExpenses);
router.post('/add', expenseController.addExpense);
router.post('/edit/:index', expenseController.editExpense);
router.post('/delete/:index', expenseController.deleteExpense);

module.exports = router;