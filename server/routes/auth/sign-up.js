require('dotenv').config()

const { body } = require('express-validator');
const { User } = require('../../../models')

const action = async (req, res) => {
  
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  };
  await User.create(user)
  .then(()=>{
    console.log(user);
    res.json(user)
  })
  .catch(err=>console.log(err));
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
