const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expenseRoutes = require('./routes/expenseRoutes');
const logger = require('./util/logger');
const  sequelize  = require('./util/database');
const Expense = require('./models/expense'); 

const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//views setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//routes
app.use(expenseRoutes);

//404 error handler
app.use((req, res, next) => {
    res.status(404).render('404');
});

//Start server and connect to database
sequelize.sync()
.then(result => {
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
})
.catch(err => {
    console.error('Database sync failed:', err);
});