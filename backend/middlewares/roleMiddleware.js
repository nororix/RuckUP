const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;

        if (!userRole) {
            return res.status(401).json({ msg: 'Unauthorized: role not found' });
        }

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ msg: 'Forbidden: role not allowed' });
        }

        next();
    };
};

module.exports = roleMiddleware;
