const router = require('express').Router();
const addPost = require('./add-post');
const readPost = require('./read-post');
const { validate } = require('../../utils');

router
  .get('/:id', readPost.action)
  .post('/add-post', validate(addPost.validators), addPost.action)
  


module.exports = router;

