require('dotenv').config()

const { body } = require('express-validator');
const { Post } = require('../../../models')

const action = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findOne({
    where: { 
      id: id
    }
  });
  res.json(post);
  
};

const validators = [
  body('title').isLength(process.env.MIN_LENGHT_TITLE),
  body('lastName').isLength(process.env.MIN_LENGHT_MIN_LENGHT_CONTENT),
];

module.exports = {
  action,
  validators
};