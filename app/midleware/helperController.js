
module.exports = {

    // Отправить ОК
    sendSuccess: (res) => data => {
        res.status(200).json(data)
    },

    // Отправить ошибку
    sendError: (res, status = 404) => error => {
        res.status(status || error.code).json({error: error.message})
    },

    // Отправить, если conditionFn == true, иначе отправим ошибку
    sendSuccesOrErrorIf: (res, conditionFn, errorMsg = 'error conditionFn == false', status = 404) => data => {
        if (conditionFn(data)) {
            res.status(200).json(data)
        } else {
            res.status(status).json({error: errorMsg});
        }
    },

    throwError: (code = 404, msg = 'not found') => error => {
        if (!error) error = new Error();
        error.code = code;
        error.message = msg || error.message;
        throw error
    },

    throwIf: (cb, code = 404) => result => {
        if (cb(result)) {
            const error = new Error();
            error.code = code;
            error.message = msg || error.message;
            throw error
        }
        return result
    }
};
