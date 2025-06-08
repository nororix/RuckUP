const roleMiddleware = (rolesPermitidos) =>{
    return(req,res,next) =>{
        const userRole = req.user?.role;

        if(!userRole){
            return res.status(401).json({msg: 'No autorizado: rol no encontrado'});

        }

        if(!rolesPermitidos.includes(userRole)){
            return res.status(403).json({msg: 'Acceso prohibido: rol no permitido'});
        }

        next();
    };
};

module.exports = roleMiddleware;