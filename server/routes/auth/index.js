const router = require('express').Router();
const signUp = require('./sign-up');
const signIn = require('./sign-in');
const getUser = require('./get-user');
const refreshToken = require('./refresh-token');
const bodyParser = require('body-parser')
const { validate } = require('../../utils');


router
  .get('/refresh-token', refreshToken.action)
  .get('/', getUser.action)
  .post('/sign-up', validate(signUp.validators), signUp.action)
  .post('/sign-in', validate(signIn.validators), signIn.action);

module.exports = router;
