const router = require('express').Router();
const addPost = require('./add-post');
const getAllPosts = require('./get-all-posts');
const readPost = require('./read-post');
const putPost = require('./put-post');
const deletePost = require('./delete-post');
const like = require('./like');
const allLike = require('./all-like')
const { validate } = require('../../utils');
const { authenticateJWT } = require('../auth-midlware');
const postsTag = require('./posts-tag')
// const multer = require('multer');

// const imagesBase = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/images') 
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname)
//     }
// });
// const upload = multer({storage: imagesBase});

// router.use(multer({storage:imagesBase}).single('filedata'))

router
  .get('/', getAllPosts.action)
  .post('/add-post', validate(addPost.validators), authenticateJWT, addPost.action)
  .get('/all-like/:id',  allLike.action)
  .post('/like',  like.action)
  .get('/:id', readPost.action)

  .get('/tag/:tag', postsTag.action)
  .put('/:id', authenticateJWT, putPost.action)
  .delete('/:id', authenticateJWT, deletePost.action);


module.exports = router;

