const router = require('express').Router();
const addPost = require('./add-post');
const readPost = require('./read-post');
const putPost = require('./put-post');
const deletePost = require('./delete-post');
const { validate } = require('../../utils');
const { authenticateJWT } = require('../auth-midlware')
router
  .get('/:id', authenticateJWT, readPost.action)
  .post('/add-post', validate(addPost.validators), authenticateJWT, addPost.action)
  .put('/:id', authenticateJWT, putPost.action)
  .delete('/:id', authenticateJWT, deletePost.action);


module.exports = router;

