import ErrorHandler from "./errorhander";

const errorHandler = (err, req, res, next) => {
    let message;
    let status = 500;
    const error = err;

    message = '';

    if (err.name === "CastError") {
        message = `Resource not found. Invalid: ${err.path}`;
        status = 400;
    }

    if (err.code === 11000) {
        message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        status = 400;
    }

    if (err.status === 401) {
        message = error.toString().substr(error.toString().indexOf(" ") + 1);
        status = err.status;
    }

    if (err.name === "JsonWebTokenError") {
        message = `Json Web Token is invalid, Try again`;
        status = 402;
    }

    if (err.name === "TokenExpiredError") {
        message = `Json Web Token is Expired, Try again`;
        status = 403;
    }

    if (message.length === 0) {
        message = error.toString().substr(error.toString().indexOf(" ") + 1);
    }

    res.status(status).json({
        message,
        status,
    });
};

export default errorHandler;
