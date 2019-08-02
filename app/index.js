const express = require('express');
const app = express();

require('./components/auth')(app);
require('./components/test1')(app);

module.exports = app;
