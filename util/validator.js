module.exports = {
    isValidAmount: (amount) => {
        return !isNaN(parseFloat(amount)) && parseFloat(amount) > 0;
    }
};