const express = require('express');
const app = express();
require('express-async-errors');

require('./startup/db')('mongodb://localhost/tenant');
require('./startup/routes')(app);

app.listen(1234, () => console.log('listen to port 1234'));