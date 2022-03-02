require('dotenv').config()

const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader;
        
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.body.autorId = user.id;
            console.log(user.id)
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
module.exports = {
    authenticateJWT,
};