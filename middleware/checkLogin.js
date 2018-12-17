const {User} = require('../models/user');

module.exports = async function(request, response, next){
    const user = await User.findOne({email: request.body.email});
    if(user){
        return response.status(400).send({
            message:'User with that user name allready exsists, user name should be uniq.',
        status: 400});
    }
    next();
}