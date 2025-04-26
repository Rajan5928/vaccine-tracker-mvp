const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: 'Invalid token'
                });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({
            message: 'Authentication required'
        });
    }
};

const authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Unauthorized'
            });
        }
        next();
    };
};

module.exports = {
    authenticate,
    authorize
};