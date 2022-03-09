const { Post } = require('../../../models')

const action = (req, res) => {
  Post.update(
    req.body,
    {
      where: { id: req.params.id },
    },
    )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(500).send({ msg: err });
    });
  
};


module.exports = {
  action
};