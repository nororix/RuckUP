const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    titulo:{type:String, required: true},
    descripcion:{type: String},
    fecha: {type: Date, require: true},
    duracion:{type: Number},
    ubicacion: {type: String},
    tipo:{
        type: String,
        enum:['físico','contacto','movimiento general', 'técnico', 'otro'],
        default: 'otro'
    },
    categoria:{
        type: String,
        enum:['masculino','femenino'],
        required: true
    },
    creadoPor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true});

module.exports = mongoose.model('Training', trainingSchema);