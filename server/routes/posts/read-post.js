const { Post, User, Tag, Like } = require('../../../models')

const action = (req, res) => {
  const id = req.params.id;
  console.log('this is ID====>>>>',id)
  Post.findOne({
    where: {id: id},
    include: [
      {
        model: User,
        as: 'Users'
      },
      {
        model: Tag,
        as: 'Tag'
      },
      {
        model: Like,
        as: 'Like'
      },
    ]
  })
      .then((data) => {
      res.send(data);
      })
      .catch((err) => {
      res.send('ERROR, not found');
      });
  
};

module.exports = {
  action
};