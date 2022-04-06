const { Post, User, Tag} = require('../../../models')

const action = async (req, res) => {
  const tag = req.params.tag;
  
  const tagDB = await Tag.findAll({
    where: {tag: tag},
    include: [
      {
        model: Post,
        as: 'Posts',
        include: [
          {
            model: User,
            as:'Users'
          },
          {
            model: Tag,
            as: 'Tag'
          },

        ]
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