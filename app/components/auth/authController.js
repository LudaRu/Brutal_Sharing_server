module.exports = {
    success: (req, res, next) => {
        res.send('Hello �����!');
    },
    error: (req, res, next) => {
        res.send('Hello fatal!');
    },
};
