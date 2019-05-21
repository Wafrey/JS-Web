const mongoose = require('mongoose');

module.exports = function initData() {
    mongoose.connect('mongodb://admin:pesho123@ds111425.mlab.com:11425/expressjs-course');
};

