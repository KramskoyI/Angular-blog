const { body } = require('express-validator');

const action = (req, res) => {
  const email = req.body.email;
  const password = req.body.password
  res.send(email, password);
};

const validators = [
  body('email').isEmail()
];

module.exports = {
  action,
  validators
};