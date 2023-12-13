const { Router } = require('express');
const router = Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');

router.get('/register', (req, res) => {
  res.render('auth_register', {
    layout: 'auth',
    title: 'Register page',
    registerErr: req.flash('registerErr'),
  });
});

router.post('/register', async (req, res) => {
  try {
    const { username, passwd, mail } = req.body;
    if (!username) {
      req.flash('registerErr', 'Username not entered!');
      res.redirect('/auth/register');
    } else if (!passwd) {
      req.flash('registerErr', 'Password not entered!');
      res.redirect('/auth/register');
    } else if (!mail) {
      req.flash('registerErr', 'Mail not entered!');
      res.redirect('/auth/register');
    } else {
      const candidateOne = await User.findOne({ mail });
      const candidateTwo = await User.findOne({ username });
      if (!candidateOne && !candidateTwo) {
        const hassPasswd = await bcrypt.hash(passwd, 10);
        const newUser = new User({
          username,
          passwd: hassPasswd,
          mail,
          cart: { items: [] },
        });
        await newUser.save();
        req.flash('UserCreated', 'User successfully created!');
        res.redirect('/auth/login');
      } else {
        console.log(1);
        req.flash(
          'registerErr',
          'User with this email or username already exist!'
        );
        res.redirect('/auth/register');
      }
    }
  } catch (e) {
    console.log(e);
  }
  console.log(req.body);
});
