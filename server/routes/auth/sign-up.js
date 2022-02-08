const { body } = require('express-validator');

const action = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  res.send(name, email, password);
};

const validators = [
  body('email').isEmail()
];

module.exports = {
  action,
  validators
};
