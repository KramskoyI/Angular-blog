const { Post, User, Tag, Like } = require('../../../models')

const action = async (req, res) => {
  await Post.findAll({
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
  .then((data)=>{
    const posts = data;
    res.send(posts)
  })
  .catch(err=>console.log(err));
};

module.exports = {
  action
};