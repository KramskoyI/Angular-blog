const router = require('express').Router();
const signUp = require('./sign-up');
const signIn = require('./sign-in');
const getUser = require('./get-user');
const refreshToken = require('./refresh-token');

const passport = require('passport');

const { validate } = require('../../utils');
require('./google');


router
  .get('/refresh-token', refreshToken.action)
  .get('/', getUser.action)
  .post('/sign-up', validate(signUp.validators), signUp.action)
  .post('/sign-in', validate(signIn.validators), signIn.action)
  .get('/google', passport.authenticate('google', { scope: ['email', 'profile'] } ) )
  .get('/google/callback', passport.authenticate('google', {
    successRedirect: '../protected',
    failureRedirect:'/fail'
  }))
  .get('/protected', (res, req)=> {
    req.send('hello my dear frend!')
  })
  .get('/fail', (res, req)=> {
    req.send('fail!!!')
  })
module.exports = router;
