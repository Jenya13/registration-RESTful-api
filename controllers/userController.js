const User = require('./../models/User');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const multer = require('multer');
const sharp = require('sharp');

const updateUserData = async (id, data) => {
  await User.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { new: true, runValidators: true }
  );
};

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

exports.getBio = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user || !user.bio) {
    return next(new AppError('There are no user or biography', 404));
  }

  const bio = user.bio;

  res.status(200).json({
    status: 'success',
    bio,
  });
});

exports.updateBio = catchAsync(async (req, res, next) => {
  const bio = req.body.bio;

  updateUserData(req.user.id, { bio: bio });

  res.status(200).json({});
});

exports.deleteBio = catchAsync(async (req, res, next) => {
  req.user.bio = undefined;
  await req.user.save();
  res.status(204).json({});
});

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

  updateUserData(req.user.id, { avatar: buffer });

  res.status(200).json({});
});

exports.deleteAvatar = catchAsync(async (req, res, next) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.status(204).json({});
});

exports.getUser = catchAsync(async (req, res, next) => {});

exports.deleteUser = catchAsync(async (req, res, next) => {});
