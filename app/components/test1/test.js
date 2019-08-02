const express = require('express');
const router = express.Router();

router.get('/success', (req, res, next) => {
    res.send('Hello YEAAA test!');
});

module.exports = router;
