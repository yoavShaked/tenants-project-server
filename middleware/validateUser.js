const {validateUser} = require('../models/user');

module.exports = function(request, response, next){
    const {error} = validateUser(request.body);
    if(error){
        return response.status(400).send(error.details[0].message);
    }
    next();
}