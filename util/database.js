const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('expense_tracker', 'root', '123456789', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    sequelize
};