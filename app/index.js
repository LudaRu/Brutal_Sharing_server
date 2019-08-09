// global.LOCATOR = require('./common/locator');
const express = require('express');
const app = express();

app.use((req, res, next) =>  {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control,x-auth-token");
    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        return res.end();
    } else {
        return next();
    }
});

// const MongoClient    = require('mongodb').MongoClient;
// const db = require('../config/db');

require('./components/auth')(app);

module.exports = app;
