const router = require('express').Router();
const signUp = require('./sign-up');
const signIn = require('./sign-in')
const { validate } = require('../../utils');

router
  .post('/sign-up', signUp.action)
  .post('/sign-in', validate(signIn.validators), signIn.action);

module.exports = router;
