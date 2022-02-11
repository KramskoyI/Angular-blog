const router = require('express').Router();
const signUp = require('./sign-up');
const { validate } = require('../../utils');

router
  .post('/sign-up', validate(signUp.validators), signUp.action)
  .post('/sign-in');

module.exports = router;
