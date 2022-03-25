require('dotenv').config()

const { body } = require('express-validator');
const { User } = require('../../../models'); 
const bcrypt = require('bcrypt');

const action = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword
  };
  await User.create(user)
  .then((data) => {
    res.status(200).send({
      firstName: data.firstName, 
      lastName: data.lastName,
      id: data.id
    });
  })
  .catch(err => console.log(err));
};

const validators = [
  body('firstName').isLength(process.env.MIN_LENGHT_FIRST_NAME),
  body('lastName').isLength(process.env.MIN_LENGHT_LAST_NAME),
  body('email').isEmail(),
  body('password').isLength(process.env.MIN_LENGHT_PASSWORD),
];

module.exports = {
  action,
  validators
};
