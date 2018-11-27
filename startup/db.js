const mongoose = require('mongoose');

module.exports = function(connectionString){
    mongoose.connect(connectionString).then(() => console.log('connect to db')).catch('faild to connect');
}