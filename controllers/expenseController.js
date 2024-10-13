const Expense = require('../models/expense');
const logger = require('../util/logger');
const formatter = require('../util/formatter');
const validator = require('../util/validator');

// Fetch all expenses and render them
exports.getExpenses = (req, res, next) => {
    Expense.findAll()
        .then(expenses => {
            res.render('index', { expenses: expenses });
        })
        .catch(error => {
            logger.log(`Error fetching expenses: ${error.message}`);
            res.status(500).send('Server Error');
        });
};

// Add a new expense
exports.addExpense = (req, res, next) => {
    const { name, amount } = req.body;
    
    // Validate amount
    if (!name || !validator.isValidAmount(amount)) {
        return res.status(400).send('invalid name or amount.');
    }
        Expense.create({ name: name, amount: parseFloat(amount) })
            .then(() => {
                res.redirect('/');
            })
            .catch(error => {
                logger.log(`Error adding expense: ${error.message}`);
                res.status(500).send('Server Error');
            });
};

// Edit an existing expense
exports.editExpense = (req, res, next) => {
    const { index } = req.params;
    const newAmount = parseFloat(req.body.amount);
    
    if (!validator.isValidAmount(newAmount)) {
        return res.status(400).send('invalid amount.');
    }
    Expense.findByPk(index)
    .then(expense => {
        if (!expense) {
            return res.status(404).send('Expense not found.');
        }
        expense.amount = newAmount;
        return expense.save();
    })
    .then(() => {
        res.redirect('/');
    })
    .catch(error => {
        logger.log(`Error editing expense: ${error.message}`);
        res.status(500).send('Server Error');
    });
};

// Delete an expense
exports.deleteExpense = (req, res, next) => {
    const { index } = req.params;

    Expense.findByPk(index)
        .then(expense => {
            if (!expense) {
                return res.status(404).send('Expense not found.');
            }
            return expense.destroy();
        })
        .then(() => {
            res.redirect('/');
        })
        .catch(error => {
            logger.log(`Error deleting expense: ${error.message}`);
            res.status(500).send('Server Error');
        });
};