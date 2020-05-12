const router = require('express').Router();
const { auth } = require('./../controllers/authController');
const {
  getUser,
  deleteUser,
  getBio,
  updateBio,
  deleteBio,
  getAvatar,
  updateAvatar,
  deleteAvatar,
  upload,
} = require('./../controllers/userController');

router
  .route('/me/avatar')
  .post(auth, upload.single('avatar'), updateAvatar)
  .delete(auth, deleteAvatar);

router.route('/users/:id/avatar').get(auth, getAvatar);

router.route('/users/:id/bio').get(auth, getBio);

router.route('/me/bio').post(auth, updateBio).delete(auth, deleteBio);

router.route('/').get(auth, getUser).delete(auth, deleteUser);

module.exports = router;
