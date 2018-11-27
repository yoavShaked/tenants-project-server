const users = require('../routes/users');
const auth = require('../routes/auth');
const tenants = require('../routes/tenants');
const error = require('../middleware/error');
const express = require('express');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/tenants', tenants);
    app.use(error);
}