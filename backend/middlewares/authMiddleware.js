const jwt = require ('jsonwebtoken');

const authMiddleware = (req, res, next) =>{
    const authHeader = req.header('Authorization');
    if(!authHeader) return res.status (401).json({msg: 'Acceso denegado'});

    console.log('authHeader:',authHeader);
    const token = authHeader.split(' ')[1];
    if(!token) return res.status(401).json({msg: 'Acceso denegado. Token mal formateado'});

    console.log('token:', token);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    try{
        const decoded = jwt.verify (token, process.env.JWT_SECRET);
        req.user = decoded;
        next ();
    } catch (error){
        res.status (401).json({msg: 'Token inválido'});
    }
};

module.exports = authMiddleware;
