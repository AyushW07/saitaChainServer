const jwt = require("jsonwebtoken")
const dotenv = require('dotenv').config();
const currentUser = (req, res, next) => {
    if (!req.session?.jwt) {

        return next();
    }

    // const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
    // console.log("JWT Payload:", payload);

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);

        req.currentUser = payload;
    } catch (err) { }

    next();
};

module.exports = currentUser;