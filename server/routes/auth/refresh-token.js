const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../../../models');
const { Token } = require('../../../models');

const action = async (req, res) => {
    
    const authHeader = req.headers.authorization;
        
     if (authHeader) {
        const token = authHeader;
    
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                const oldTokenMas = authHeader.split('.');
                const oldPayload = JSON.parse(Buffer.from(oldTokenMas[1], 'base64').toString('utf8'));
                const userId = oldPayload.id;
                const user = User.findOne({where: {id: userId}})
                const accessToken = jwt.sign({id: user.id}, process.env.SECRET, { expiresIn: '660s' });
                res.json({ accessToken: accessToken, userId: userId })
            } 
                
        });
    } else {
        res.sendStatus(401);
    }
};



module.exports = {
  action,
  
};