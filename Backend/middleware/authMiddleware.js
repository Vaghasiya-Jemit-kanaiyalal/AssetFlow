const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_assetflow';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // Support both "Bearer <token>" and raw token
    const token = authHeader && (authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader);

    if (!token) {
        return res.status(401).json({ error: 'Access token is required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
}

function requireRole(allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Permission denied: Insufficient privileges' });
        }
        next();
    };
}

module.exports = {
    authenticateToken,
    requireRole
};
