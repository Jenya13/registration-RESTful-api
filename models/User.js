const mongoose = require('mongoose');
const validator = require('validator');

// Definition of user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name was not provided'],
    maxlength: [50, 'Name is too long, mast be no longer than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email was not provided'],
    unique: true,
    validate: [validator.isEmail, 'Wrong email'],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password was not provided'],
    minlength: [6, 'Password is too short, must be at least 6 characters'],
    select: false,
  },
  avatar: {
    type: String,
  },
  bio: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
