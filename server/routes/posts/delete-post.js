const { Post } = require('../../../models')

const action = (req, res) => {
    Post.destroy({
        where: { id: req.params.id},
      })
      .then((data) => {
        res.sendStatus(200);
      })
      .catch(() => {
        res.status(500);
      });
  
};


module.exports = {
  action
};