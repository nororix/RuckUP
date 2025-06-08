const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const {nombre, email, password, genero, rol} = req.body;

    try{
        const userExists = await User.findOne({email});
        if (userExists) return res.status(400).json({ msg:'El usuario ya existe'});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User ({nombre, email, password: hashedPassword, genero,rol });
        await newUser.save();

        res.status(201).json({ msg: 'Usuario registrado correctamente'});
    }catch (error){
        res.status(500).json({msg: error.message});
    }

};

const login = async (req, res) =>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({msg: 'Credenciales inválidas'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: 'Credenciales inválidas'});

        const token = jwt.sign (
            { id: user._id, role: user.rol}, 
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN}
        );

        res.status(200).json({
            token, 
            user: {id: user._id, nombre: user.nombre, email: user.email, rol:user.rol}});
    }catch (error) {
        res.status(500).json({msg: 'Error en el servidor'})
    } 
};

module.exports = {register, login};