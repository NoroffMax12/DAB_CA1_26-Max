var express = require('express');
var router = express.Router();
const passport = require('passport');
const { User } = require('../models');
const { populateDatabase } = require('../services/populateService');

/* GET home page. */
router.get('/', function (req, res, next) {
  // pass the authenticated user (if any) to the template so that the navbar
  // can render proper links/username
  res.render('index', { title: 'Express', user: req.user || null });
});

//GET login page
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});


//POST login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/animals',
  failureRedirect: '/login'
}));

//GET signup page
router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Sign Up' });
});

//POST signup
router.post('/signup', async function (req, res, next) {
  try {
    const { fullName, username, password } = req.body;
    
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    await User.create({
      fullName,
      username,
      password,
      role: 'member'
    });

    res.redirect('/login');
  } catch (error) {
    next(error);
  }
});

//POST logout
router.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

//POST populate database
router.post('/populate', async function (req, res, next) {
  try {
    const result = await populateDatabase();
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


module.exports = router;