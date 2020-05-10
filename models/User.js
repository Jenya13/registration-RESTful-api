const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Definition of user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name was not provided'],
    trim: true,
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
    type: Buffer,
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

// password encryption
UserSchema.pre('save', async function (next) {
  // only if password was modified
  if (!this.isModified('password')) return next();

  // hash the password
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

UserSchema.methods.correctPassword = async function (
  testPassword,
  userPassword
) {
  return await bcrypt.compare(testPassword, userPassword);
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
