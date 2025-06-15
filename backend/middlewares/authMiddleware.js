const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ msg: 'Access denied' });

    console.log('authHeader:', authHeader);
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'Access denied. Malformed token' });

    console.log('token:', token);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};

module.exports = authMiddleware;
