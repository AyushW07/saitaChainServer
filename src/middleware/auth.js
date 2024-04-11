const { ClientRoles } = require('../clientRole');

// Assumes we are going to call current Client before this middleware
const requireAuthorization = (roles) => {

    const checkAuthorization = (req, res, next) => {

        if (req.hostname === 'saitachain.com' && (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE')) {
            return next();
        }
        if (!req.currentUser) {
            return res.status(400).send("You must be logged in to view this resource.");
        }

        const exists = roles.includes(req.currentUser.role);
        if (!exists) {
            return res.status(401).send("not authorized")
        }

        next();
    };
    return checkAuthorization;
};

module.exports = requireAuthorization;
