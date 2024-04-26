const jwt = require("jsonwebtoken")
const dotenv = require('dotenv').config();
const currentUser = (req, res, next) => {
    if (!req.session?.jwt) {
        try {
            const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);

            req.currentUser = payload;
        } catch (err) { }

        return next();
    }
};

module.exports = currentUser;