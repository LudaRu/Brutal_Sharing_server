const restify = require('restify');
const mongoose = require('mongoose');
const CONFIG = require('./config');
const rjwt = require('restify-jwt-community');

const server = restify.createServer();

// Middleware
server.use(restify.plugins.bodyParser());

// Protect Routes
// server.use(rjwt({ secret: CONFIG.JWT_SECRET }).unless({ path: ['/auth'] }));

server.listen(CONFIG.PORT, () => {
    // mongoose.set('useFindAndModify', false);
    // mongoose.connect(
    //     CONFIG.MONGODB_URI,
    //     { useNewUrlParser: true }
    // );
});

require('./routes/user')(server);

// const db = mongoose.connection;
//
// db.on('error', err => console.log(err));
// db.once('open', () => {
//     require('./routes/user')(server);
    console.log(`Сервер стартед он порт ${CONFIG.PORT}`);
// });

// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
