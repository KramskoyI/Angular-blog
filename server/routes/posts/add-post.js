const { body } = require('express-validator');

const action = (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const tag = req.body.tag;
  res.send(title, description, tag);
};

module.exports = {
  action
};