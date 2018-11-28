const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const validation = require('../middleware/validateUser');
const checkUserExists = require('../middleware/checkLogin');

router.post('/',validation, checkUserExists, async (request, response) => {
    const {userName, password} = request.body;

    user = new User({
        userName,
        password
    });

    const salt = await bcrypt.genSalt(5);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.genToken();
    response.header('x-auth-token', token).send({name: user.userName, token});
});

module.exports = router;