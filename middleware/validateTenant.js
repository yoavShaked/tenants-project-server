const {validateTenant} = require('../models/tenant');

module.exports = function(request, response, next){
    const {error} = validateTenant(request.body); 
    if(error){
        return response.status(400).send(error.details[0].message);
    }
    next();
}