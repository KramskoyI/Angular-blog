const router = require('express').Router();
const addPost = require('./add-post')

router.
    post('add-post', addPost.action)
module.exports = router;

