require('dotenv').config()

const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../../../models');
const { Token } = require('../../../models');

const action = async (req, res) => {
  const user = await User.findOne({
    where: { 
        email: req.body.email
    }
  });
 
  const refreshToken = await uuidv4();

  const accessToken = jwt.sign({id: user.id}, process.env.SECRET, { expiresIn: '900s' });
  const decoded = jwt.verify(accessToken, process.env.SECRET);
  
  const tokenUser = { 
    userId: user.id,
    refreshToken: refreshToken
  };

  if(tokenUser) {
    await Token.create(tokenUser)
    .then( () => {
      res.status(200);
    })
    .catch(err=>console.log(err));
  };

  // const decoded = jwt.decode(accessToken, array('HS256'));
  res.cookie('refreshToken', refreshToken, { maxAge: 1800 * 1000, httpOnly: true })
  
  res.json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    accessToken: accessToken,
    expiresIn: decoded.exp
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