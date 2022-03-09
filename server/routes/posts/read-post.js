const { Post, User } = require('../../../models')

const action = (req, res) => {
  const id = req.params.id;
  console.log('this is ID====>>>>',id)
  Post.findOne({
    where: {id: id},
    include: {
      model: User,
      as: 'Users'
    }
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