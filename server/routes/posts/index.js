const router = require('express').Router();
const addPost = require('./add-post');
const { validate } = require('../../utils');

router
  .post('/add-post', validate(addPost.validators), addPost.action)



module.exports = router;

