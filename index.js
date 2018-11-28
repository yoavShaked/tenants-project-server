const express = require('express');
const app = express();
const cors = require('cors');

require('express-async-errors');

require('./startup/db')('mongodb://localhost/tenant');
app.use(cors());
require('./startup/routes')(app);
app.listen(1234, () => console.log('listen to port 1234'));