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
    if (validator.isValidAmount(amount)) {
        Expense.create({ name: name, amount: parseFloat(amount) })
            .then(() => {
                res.redirect('/');
            })
            .catch(error => {
                logger.log(`Error adding expense: ${error.message}`);
                res.status(500).send('Server Error');
            });
    } else {
        res.status(400).send('Invalid amount.');
    }
};

// Edit an existing expense
exports.editExpense = (req, res, next) => {
    const { index } = req.params;
    const newAmount = parseFloat(req.body.amount);
    
    if (validator.isValidAmount(newAmount)) {
        Expense.findByPk(index)
            .then(expense => {
                if (expense) {
                    expense.amount = newAmount;
                    return expense.save();
                } else {
                    res.status(404).send('Expense not found.');
                }
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(error => {
                logger.log(`Error editing expense: ${error.message}`);
                res.status(500).send('Server Error');
            });
    } else {
        res.status(400).send('Invalid amount.');
    }
};

// Delete an expense
exports.deleteExpense = (req, res, next) => {
    const { index } = req.params;

    Expense.findByPk(index)
        .then(expense => {
            if (expense) {
                return expense.destroy();
            } else {
                res.status(404).send('Expense not found.');
            }
        })
        .then(() => {
            res.redirect('/');
        })
        .catch(error => {
            logger.log(`Error deleting expense: ${error.message}`);
            res.status(500).send('Server Error');
        });
};
