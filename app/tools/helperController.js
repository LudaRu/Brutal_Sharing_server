module.exports = {
    sendSuccess: (res) => data => {
        res.status(200).json(data)
    },

    sendError: (res, status = 404) => error => {
        res.status(status || error.code).json({error: error.message})
    },

    throwError: (code = 404, msg = 'not found') => error => {
        if (!error) error = new Error();
        error.code = code;
        error.message = msg || error.message;
        throw error
    },

    throwIf: (cb, code) => result => {
        if (cb(result)) {
            return throwError(code)()
        }
        return result
    }
};
