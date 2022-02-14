require('dotenv').config()

const { body } = require('express-validator');
const { User } = require('../../../models')

const action = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };
  await User.findAll({user})
    .then((data) => {
        res.status(200).send(data);
    })
  
};

const validators = [
  body('email').isEmail(),
  body('password').isLength(process.env.MIN_LENGHT_PASSWORD),
];

module.exports = {
  action,
  validators
};