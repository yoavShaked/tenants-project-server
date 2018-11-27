const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Tenant } = require('../models/tenant');
const { User, getTenants } = require('../models/user');
const validateTenant = require('../middleware/validateTenant');

router.get('/', async (request, response) => {
    response.send(await Tenant.find());
});

router.get('/:id', async (request, response) => {
    const tenant = await Tenant.findById(request.params.id);
    if (!tenant) {
        return response.status(404).send('Tenant with the given id was not found.');
    }
    response.send(tenant);
});

router.post('/', auth, validateTenant, async (request, response) => {
    const { name, phoneNumber, address } = request.body
    let tenant = new Tenant({
        name,
        phoneNumber,
        address
    });

    await tenant.save();
    let user = await User.findById(request.user);
    user.tenants.push(tenant);
    await user.save();

    response.send(await getTenants(request.user));
});

router.put('/:id', auth, validateTenant, async (request, response) => {
    const { name, phoneNumber, address, debt } = request.body;
    const tenant = await Tenant.findByIdAndUpdate(request.params.id, {
        name,
        address,
        phoneNumber,
        debt
    });

    if (!tenant) {
        return response.status(404).send('Tenant with the given id was not found')
    }

    let user = await User.findById(request.user);
    await user.save();

    response.send(await getTenants(request.user));
});

router.delete('/:id', auth, async (request, response) => {
    const tenant = await Tenant.findByIdAndRemove(request.params.id);
    if (!tenant) {
        return response.status(400).send('Tenant with the given id was not found');
    }

    let user = await User.findById(request.user);
    await user.save();
    response.send(await getTenants(request.user));
});

module.exports = router;