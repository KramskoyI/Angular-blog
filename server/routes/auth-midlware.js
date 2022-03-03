require('dotenv').config()

const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader;

        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                const oldTokenMas = authHeader.split('.');
                const oldPayload = JSON.parse(Buffer.from(oldTokenMas[1], 'base64').toString('utf8'));
                const userId = oldPayload.id;
                
                const user = User.findOne({where: {id: userId}})
                
                const accessToken = jwt.sign({id: user.id}, process.env.SECRET, { expiresIn: '360s' });
                res.json({
                    accessToken: accessToken,
                }); 
                console.log('new token', accessToken)
                res.sendStatus(403);
            } else {
                req.body.autorId = user.id;
                next();
            }
            
        });
    } else {
        res.sendStatus(401);
    }
};
module.exports = {
    authenticateJWT,
};