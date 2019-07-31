const Locator = require('../../../tools/ServiceLocator');
// const userController = require('../controllers/User');

const app = Locator.get('app');



app.get('/api/auth/:name', function(req, res, next) {
    console.log(req.params)
    res.send(200, req.params);
});

app.put('/api/lol/:item', function(req, res, next) {
    req.item.set(req.body);
    req.item.save(function(err, item) {
        res.send(204, item);
    });
});

// app.post('/api/auth', userController.create);