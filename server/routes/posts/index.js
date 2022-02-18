const router = require('express').Router();
const addPost = require('./add-post');
const readPost = require('./read-post');
const putPost = require('./put-post');
const deletePost = require('./delete-post');
const { validate } = require('../../utils');

router
  .get('/:id', readPost.action)
  .post('/add-post', validate(addPost.validators), addPost.action)
  .put('/:id', putPost.action)
  .delete('/:id', deletePost.action);


module.exports = router;

