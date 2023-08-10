
const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if (err.code === 11000) {
        err.message = `Duplicate ${object.keys(err.keyValue)} Entered`;
        err.statusCode = 400;
    }

    res.status(err.statusCode).json({success:false, message:err.message})
}

module.exports = errorMiddleware;

const asyncError = (passedFunc) => (req, res, next) => {
    Promise.resolve(passedFunc(req, res, next)).catch(next);
}
module.exports = asyncError;
