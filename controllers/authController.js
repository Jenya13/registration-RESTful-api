const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('./../models/User');
const jwt = require('jsonwebtoken');

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, bio, password } = req.body;
  const user = await User.create({
    name,
    email,
    bio,
    password,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token,
    user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError('Please provide email and password', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect user or password ', 401));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.auth = catchAsync();
