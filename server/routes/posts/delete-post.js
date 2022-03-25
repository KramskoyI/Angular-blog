const { Post } = require('../../../models')

const action = (req, res) => {
    Post.destroy({
        where: { id: req.params.id},
      })
      .then((data) => {
        res.status(200).end();
      })
      .catch(() => {
        res.status(500);
      });
  
};


module.exports = {
  action
};