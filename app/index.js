const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
}));

// const MongoClient    = require('mongodb').MongoClient;
// const db = require('../config/db');

require('./components/auth')(app);

module.exports = app;
