const AppError = require('./../utils/appError');

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

const handleMulterError = (err) => new AppError(err.message, err.statusCode);

const handleTypeError = (err) => new AppError(err.message, err.statusCode);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };

  if (error.name === 'CastError') error = handleCastErrorDB(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (error.name === 'ValidationError') {
    error = handleValidationErrorDB(error);
  }
  if (error.name === 'JsonWebTokenError') error = handleJwtError();
  if (error.name === 'TokenExpiredError') error = handleTokenExpiredError();
  if (error.name === 'MulterError') error = handleMulterError(error);
  if (err.message === 'inncorect file formate') {
    error = handleMulterError(err);
  }
  if (
    err.name === 'TypeError' &&
    err.message === `Cannot read property 'buffer' of undefined`
  )
    error = handleTypeError(err);

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};
