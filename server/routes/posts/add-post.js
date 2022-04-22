require('dotenv').config()

const fs = require("fs");
const { body } = require('express-validator');
const { Post, Tag } = require('../../../models')

const action = async (req, res) => {
  const data = req.body.image;
  const tag = req.body.tag;
  if(data) {
    const base64Data = data.replace( /^data:image\/jpeg;base64,/, "");
    const file = req.body.nameImage;
    fs.writeFile(file, base64Data, 'base64', function(err) {
      if( err) {
        console.log(err);
      } 
    });
    fs.rename( file, `server/public/image/${file}`, err => {
      if(err) throw err; // не удалось переместить файл
      console.log('Файл успешно перемещён');
    });
    
    const post = {
      title: req.body.title,
      content: req.body.content,
      image: file,
      autorId: req.body.autorId
    };
    
    const postDb = await Post.create(post) // post.id ===>> is post id
    .then((post)=>{
      res.send(post)
      return post
    })
    if(tag) {
      const arrTags = tag.split(',');
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
    }
    
  } else {
    const post = {
      title: req.body.title,
      content: req.body.content,
      image: 'not.jpeg',
      autorId: req.body.autorId
    };
    
    const postDb = await Post.create(post) // post.id ===>> is post id
    .then((post)=>{
      res.send(post)
      return post
    })

    if(tag) {
      const arrTags = tag.split(',');
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
    }
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