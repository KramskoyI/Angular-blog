const router = require('express').Router();
const authRouter = require('./auth');
const postsRouter = require('./posts');

router
  .use('/auth', authRouter)
  .use('/posts', postsRouter);

module.exports = router;
