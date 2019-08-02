const CONFIG = require('./config');
const app = require('./app');
const port = CONFIG.PORT || 3000;

// require('./routes/user')(server);

app.listen(port, function (err) {
    if (err) {
        throw err
    }
    console.log(`сервер ис листенинг он порт ${CONFIG.PORT}`)
});

