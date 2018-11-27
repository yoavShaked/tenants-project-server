const {User} = require('../models/user');

module.exports = async function(request, response, next){
    const user = await User.findOne({userName: request.body.userName});
    if(user){
        return response.status(400).send('User with that user name allready exsists, user name should be uniq.');
    }
    next();
}