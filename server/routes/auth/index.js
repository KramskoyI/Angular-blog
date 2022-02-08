const router = require('express').Router();
const signUp = require('./sign-up');
const singIn = require('./sign-in')
const { validate } = require('../../utils');

router
  .post('/sign-up', validate(signUp.validators), signUp.action)
  .post('/sign-in', validate(singIn.validators), singIn.action);

module.exports = router;
