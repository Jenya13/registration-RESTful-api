const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/User');

exports.register = catchAsync();

exports.login = catchAsync();

exports.auth = catchAsync();
