const router = require('express').Router();

router.route('/').get((req, res) => {
  res.send('in auth route');
});

module.exports = router;
