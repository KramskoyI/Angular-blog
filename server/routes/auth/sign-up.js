const { body } = require('express-validator');

const action = (req, res) => {
  const data = req.body.email;
  res.send(data);
};

const validators = [
  body('email').isEmail()
];

module.exports = {
  action,
  validators
};
