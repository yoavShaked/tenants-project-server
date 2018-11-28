const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

module.exports = function (request, response, next){
    const token = request.body.token;
    if(!token) return response.status(401).send('Access denide. No token provided.');

    try{
        const decodePayload = jwt.verify(token, "123456");
        request.user = decodePayload;
        next();
    }
    catch(ex){
        response.status(400).send('Invalid token.');
    }
}