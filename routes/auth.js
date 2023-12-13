const { Router } = require('express');
const router = Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth')

router.get('/register', auth, (req, res) => {
  res.render('auth_register', {
    layout: 'auth',
    title: 'Register page',
    registerErr: req.flash('registerErr'),
  });
});

router.post('/register', auth, async (req, res) => {
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
});

router.get('/login', auth, (req, res) => {
    res.render('auth_login', {
        layout: 'auth',
        title: 'Login page',
        userCreated: req.flash('UserCreated'),
        loginErr: req.flash('loginErr')
    })
})

router.post('/login', auth, async (req, res) => {
    try {
        const { username, passwd } = req.body
        const candidate = await User.findOne({ username })
        if (candidate) {
            const passStatus = await bcrypt.compare(passwd, candidate.passwd)
            if (passStatus) {
                req.session.isAuth = true
                req.session.user = candidate
                req.session.save((err) => {
                    if (err) throw err
                    res.redirect('/')
                })
            } else {
                req.flash('loginErr', 'Incorrect password!')
                res.redirect('/auth/login')
            }
        } else {
            req.flash('loginErr', 'User with this username doesn`t exist!')
            res.redirect('/auth/login')
        }
    } catch (e) {
        console.log(e)
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err
        res.redirect('/auth/login')
    })
})

module.exports = router