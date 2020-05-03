const router = require('express').Router();

router.route('/').get((req, res) => {
  res.send('in user route');
});

module.exports = router;
