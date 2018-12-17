const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const env = require('dotenv');

env.config();

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength:255
    },
    tenants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tenant'
        }
    ]
});

userSchema.methods.genToken = function (){
    return jwt.sign({_id: this._id}, "123456");
}


const User = mongoose.model('User', userSchema);

async function getTenants(userId)
{
    const tenants = await User
        .findById(userId)
        .populate('tenants', 'name phoneNumber address debt _id')
        .select('tenants -_id');
    return tenants;
}


function validateUser(user) {
    return Joi.validate(user, {
        userName: Joi.string().min(4).max(50).required(),
        password: Joi.string().min(4).required()
    });
}

module.exports = {
    User,
    validateUser,
    getTenants
}