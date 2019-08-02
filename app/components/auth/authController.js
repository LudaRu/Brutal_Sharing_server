module.exports = {
    success: (req, res, next) => {
        res.send('Hello Успех!');
    },
    error: (req, res, next) => {
        res.send('Hello fatal!');
    },
};
