const config = require('config');
const app = require('./app');
const mongoose = require('mongoose');

const port = 3000;

mongoose.connect(config.get('db'), { useNewUrlParser: true });

app.listen(port, function (err) {
    if (err) {
        throw err
    }
    console.log(`сервер ис листенинг`)
});

