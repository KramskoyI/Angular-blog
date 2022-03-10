const { Post, User, Tag } = require('../../../models')

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