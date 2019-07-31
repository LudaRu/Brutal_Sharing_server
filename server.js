const Locator = require('./tools/ServiceLocator');

const app = require('./app');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

Locator.add('app', app);
Locator.add('mongoose', mongoose);

const routesUser = require('./modules/user/routes/User');

// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
// mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


const server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
