const mongoose = require('mongoose');
const Joi = require('joi');

const tenantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:4,
        maxlength:50
    },
    phoneNumber:{
        type:Number,
        required:true,
        minlength:7,
        maxlength:20
    },
    address:{
        type:String,
        required:true,
        minlength:4,
        maxlength:50
    },
    debt:{
        type:Boolean,
        default:false
    },

});

const Tenant = mongoose.model('Tenant', tenantSchema);

function validateTenant(tenant){
    return Joi.validate(tenant,{
        name: Joi.string().min(4).max(50).required(),
        phoneNumber: Joi.number().min(7).required(),
        address: Joi.string().min(4).max(50).required(),
        debt: Joi.boolean()
    });
}

module.exports = {
    Tenant,
    validateTenant,
}