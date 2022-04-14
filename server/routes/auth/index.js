const router = require('express').Router();
const signUp = require('./sign-up');
const signIn = require('./sign-in');
const getUser = require('./get-user');
const refreshToken = require('./refresh-token');

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
  .get('/protected', isLoggedIn, (req, res)=> {
    console.log(req.user)
    res.send(`Hello ${req.user.email}, ${req.user.name.givenName}, ${req.user.name.familyName}`);
  })
  .get('/fail', (res, req)=> {
    req.send('fail!!!')
  })
module.exports = router;
