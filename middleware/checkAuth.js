const {User} = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = async function(request, response, next){
    const user = await User.findOne({userName: request.body.userName});
    if(!user){
        return response.status(400).send('Invalid user or password.');
    }

    const isValidPassword = await bcrypt.compare(request.body.password, user.password);
    if(!isValidPassword){
        return response.status(400).send('Invalid user or password.');
    }
    
    request.user = user;
    next();
}