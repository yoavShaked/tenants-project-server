const {User} = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = async function(request, response, next){
    const user = await User.findOne({userName: request.body.userName});
    if(!user){
        return response.status(400).json({message:'Invalid user or password.', status: 400});
    }

    const isValidPassword = await bcrypt.compare(request.body.password, user.password);
    if(!isValidPassword){
        return response.status(400).json({message:'Invalid user or password.', status: 400});
    }
    
    request.user = user;
    next();
}