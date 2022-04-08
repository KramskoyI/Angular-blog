const router = require('express').Router();
const signUp = require('./sign-up');
const signIn = require('./sign-in');
const getUser = require('./get-user');
const refreshToken = require('./refresh-token');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const { validate } = require('../../utils');


router
  .get('/refresh-token', refreshToken.action)
  .get('/', getUser.action)
  .post('/sign-up', validate(signUp.validators), signUp.action)
  .post('/sign-in', validate(signIn.validators), signIn.action)
  .get('/google', passport.authenticate('google', { scope: ['profile'] }))
  .get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' })
  // ,
  //   function(req, res) {
  //     // Successful authentication, redirect home.
  //     res.redirect('/');
  //   }
  );
module.exports = router;
