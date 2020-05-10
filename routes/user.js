const router = require('express').Router();
const { auth } = require('./../controllers/authController');
const {
  getUser,
  deleteUser,
  getBio,
  setBio,
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

router
  .route('/me/bio')
  .get(auth, getBio)
  .post(auth, setBio)
  .patch(auth, updateBio)
  .delete(auth, deleteBio);

router.route('/:id').get(auth, getUser).delete(auth, deleteUser);

module.exports = router;
