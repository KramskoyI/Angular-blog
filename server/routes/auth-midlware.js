require('dotenv').config()

const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader;
        jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
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