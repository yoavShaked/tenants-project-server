const express = require('express');
const router = express.Router();
const validation = require('../middleware/validateUser');
const checkAuth = require('../middleware/checkAuth');

router.post('/', validation, checkAuth, async (request, response) => {
    const token = request.user.genToken();
    response.header('x-auth-token', token).send({ name: request.user.userName, token });
});

module.exports = router;