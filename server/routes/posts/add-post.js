require('dotenv').config()

const { body } = require('express-validator');
const { Post, Tag } = require('../../../models')

const action = async (req, res) => {
  let filedata  = req.file ? req.file.filename : null
  
  const tag = req.body.tag;
  const arrTags = tag.split(',');

  const post = {
    title: req.body.title,
    content: req.body.content,
    image: filedata,
    autorId: req.body.autorId
  };
  
  console.log(post, tag)
  
  const postDb = await Post.create(post) // post.id ===>> is post id
  .then((post)=>{
    res.send(post)
    return post
  })
  console.log(postDb.id)

  for (let i = 0; i < arrTags.length; i++) {
    let tagOne = {
      tag: arrTags[i],
      postId: postDb.id
    };
    Tag.create(tagOne)
      .then((tag)=>{
        res.status(200)
      })
  }
  
  
};


const validators = [
  body('title').isLength(process.env.MIN_LENGHT_TITLE),
  body('lastName').isLength(process.env.MIN_LENGHT_MIN_LENGHT_CONTENT),
];

module.exports = {
  action,
  validators
};