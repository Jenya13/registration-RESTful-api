const User = require('./../models/User');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const multer = require('multer');
const sharp = require('sharp');

exports.upload = multer({
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new AppError('File must be an image', 400));
    }

    cb(undefined, true);
  },
});

exports.getUser = catchAsync(async (req, res, next) => {});

exports.deleteUser = catchAsync(async (req, res, next) => {});

exports.getBio = catchAsync(async (req, res, next) => {});

exports.setBio = catchAsync(async (req, res, next) => {});

exports.updateBio = catchAsync(async (req, res, next) => {});

exports.deleteBio = catchAsync(async (req, res, next) => {});

exports.getAvatar = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user || !user.avatar) {
    return next(new AppError('There are no user or avatar', 404));
  }
  res.set('Content-Type', 'image/png');
  res.send(user.avatar);
});

exports.updateAvatar = catchAsync(async (req, res, next) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 150, height: 150 })
    .png()
    .toBuffer();

  const user = await User.findById(req.user.id);

  //   console.log(req.user);

  await User.findOneAndUpdate(
    { _id: req.user.id },
    { $set: { avatar: buffer } },
    { new: true, runValidators: true }
  );

  res.status(200).json({});
});

exports.deleteAvatar = catchAsync(async (req, res, next) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.status(204).json({});
});
