const { Post, User } = require('../../../models')

const action = async (req, res) => {
  await Post.findAll({
    include: {
        model: User,
        as: 'Users'
      }
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