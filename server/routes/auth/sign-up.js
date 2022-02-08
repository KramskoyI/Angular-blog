const { body } = require('express-validator');

const action = (req, res) => {
  if(!req.body) return res.sendStatus(400);
  const user = { 
    name: req.body.name, 
    email: req.body.email, 
    password: req.body.password
  };

  Users.create(user).then(()=>{
    console.log(user);
  }).catch(err=>console.log(err));
};

// const validators = [
//   body('email').isEmail()
// ];

module.exports = {
  action,
  // validators
};
