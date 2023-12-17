const { Router } = require('express');
const router = Router();
const notAuth = require('../middleware/notAuth');

router.get('/', notAuth, (req, res) => {
  const user = req.user;
  res.render('index', {
    title: 'Main page',
    username: user.username,
  });
});

module.exports = router;
