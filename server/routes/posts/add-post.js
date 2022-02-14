require('dotenv').config()

const { body } = require('express-validator');
const { Post } = require('../../../models')

const action = async (req, res) => {
  
  const post = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    autorId: req.body.autorId
  };

  await Post.create(post)
  .then(()=>{
    // console.log(post);
    res.send(post)
  })
  .catch(err=>console.log(err));
};

const validators = [
  body('title').isLength(process.env.MIN_LENGHT_TITLE),
  body('lastName').isLength(process.env.MIN_LENGHT_MIN_LENGHT_CONTENT),
];

module.exports = {
  action,
  validators
};