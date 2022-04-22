const router = require('express').Router();
const signUp = require('./sign-up');
const signIn = require('./sign-in');
const getUser = require('./get-user');
const refreshToken = require('./refresh-token');
const { User } = require('../../../models'); 
const bcrypt = require('bcrypt');
const passport = require('passport');

const { validate } = require('../../utils');
require('./google');

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

router
  .get('/refresh-token', refreshToken.action)
  .get('/', getUser.action)
  .post('/sign-up', validate(signUp.validators), signUp.action)
  .post('/sign-in', validate(signIn.validators), signIn.action)
  .get('/google', passport.authenticate('google', { scope: ['email', 'profile'] } ) )
  .get('/google/callback', passport.authenticate('google', {
    successRedirect: '../protected',
    failureRedirect:'/fail',
      
  }))
  .get('/protected', isLoggedIn, async (req, res)=> {
    const password = 'google';
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = {
      firstName: req.user.name.givenName,
      lastName: req.user.name.familyName,
      email: req.user.email,
      password: hashedPassword
    };
    await User.create(user)
    .then((data) => {
      res.status(200)
    })
    .catch(err => console.log(err));
    console.log(req.user)
    res.send(`Hello ${req.user.email}, you can LogIn to our BLOG!`);
  })
  .get('/fail', (res, req)=> {
    req.send('fail!!!')
  })
module.exports = router;
