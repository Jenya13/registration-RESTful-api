const router = require('express').Router();
const { auth, register, login } = require('./../controllers/authController');

router.route('/register').get((req, res) => {
  res.send('in auth route');
});
router.route('/login').get((req, res) => {
  res.send('in auth route');
});

module.exports = router;
