const { User } = require('../../../models');
const jwt = require('jsonwebtoken');

const action = (req, res) => {
  const authHeader = req.headers.authorization;
  console.log('heder', authHeader)
  jwt.verify(authHeader, process.env.SECRET, (err, user) => {
    if (err) {
        const oldTokenMas = authHeader.split('.');
        const oldPayload = JSON.parse(Buffer.from(oldTokenMas[1], 'base64').toString('utf8'));
        const userId = oldPayload.id;
        const user = User.findOne({where: {id: userId}})
        .then((data) => {
          console.log('data',data)
          res.status(200).send({
            firstName: data.firstName, 
            lastName: data.lastName,
            id: data.id
          });
        })
        .catch(err => console.log(err));
        console.log(user)
    } 
    
  });
    
};
  
module.exports = {
  action
};