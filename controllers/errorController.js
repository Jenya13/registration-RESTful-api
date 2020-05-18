const AppError = require('./../utils/appError');

const sendError = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate fielde value: ${value}, Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJwtError = () => new AppError('Invalid token, Please login', 401);

const handleTokenExpiredError = () =>
  new AppError('Your token has expired, Please login again', 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.name === 'CastError') err = handleCastErrorDB(err);
  if (err.code === 11000) err = handleDuplicateFieldsDB(err);
  if (err.name === 'ValidationError') {
    err = handleValidationErrorDB(err);
  }
  if (err.name === 'JsonWebTokenError') err = handleJwtError();
  if (err.name === 'TokenExpiredError') err = handleTokenExpiredError();

  sendError(err, res);
};
