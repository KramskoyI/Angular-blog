const { Post, Tag } = require('../../../models')
const fs = require("fs");

const action = async (req, res) => {
  const data = req.body.image;
  const tag =req.body.tag;
  console.log(req.body)
  if(data) {
    const base64Data = data.replace( /^data:image\/jpeg;base64,/, "");
    const file = req.body.nameImage;
    fs.writeFile(file, base64Data, 'base64', function(err) {
      if(err) {
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
    };
      
    await Post.update(
      post,
      {
        where: { id: req.params.id },
      }
    )
      .then((data) => {
        res.status(200).send(data);
      })
      .catch(() => {
        res.status(500);
      });
      
      
    } else {
      const post = {
        title: req.body.title,
        content: req.body.content,
        image: 'not.jpeg',
        autorId: req.body.autorId
      };
      
      const postDb = await Post.update(
        post,
        {
          where: { id: req.params.id },
        },
        )
        .then((data) => {
          res.status(200).send(data);
        })
        .catch(() => {
          res.status(500);
        });
    }
    if(tag) {
      Tag.destroy({
        where: { postId: req.params.id},
      })
      .then((data) => {
        res.status(200).end();
      })
      .catch(() => {
        res.status(500);
      });
      const arrTags = tag.split(',');
      console.log(arrTags)
      for (let i = 0; i < arrTags.length; i++) {
        let tagOne = {
          tag: arrTags[i],
          postId: req.params.id
        };
        Tag.create(tagOne)
        .then(()=>{
          res.status(200)
        })
      }
    }
};


module.exports = {
  action
};