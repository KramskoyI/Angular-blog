const { Post, User, Tag} = require('../../../models')

const action = async (req, res) => {
  const tag = req.params.tag;
  
  const tagDB = await Tag.findOne({
    where: {tag: tag},
    
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send('ERROR, not found');
    });
    // res.send(tagDB);
    
    
  
    
};

module.exports = {
  action
};