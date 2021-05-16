const jwt = require('jsonwebtoken');
const config = require('config');

// Once jwt token is validated and decoded, we move onto the "next" function in our route
module.exports = function(req, res, next) {
    // Get token from request header
    const token = req.header('x-auth-token');

    // Check if there is token in the first place
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    };

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Each time a request passes the mw, we identify the user by decoding the jwt token
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}