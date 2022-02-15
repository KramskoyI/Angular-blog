require('dotenv').config()

const { body } = require('express-validator');
const { User } = require('../../../models')
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const action = async (req, res) => {
  const user = await User.findOne({
    where: { 
        email: req.body.email
    }
  });
  if (!user) {
    const error = new Error();
    error.status = 403;
    throw error;
  }
  const refreshToken = uuidv4();
  const accessToken = jwt.sign({id: user.id}, process.env.SECRET, { expiresIn: '900s' });
  // res.json({accessToken: accessToken, refreshToken:refreshToken});
  res.status(200).send({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lasttName,
    email: user.email,
    accessToken: accessToken
  });  
};

const validators = [
  body('email').isEmail(),
  body('password').isLength(process.env.MIN_LENGHT_PASSWORD),
];

module.exports = {
  action,
  validators
};