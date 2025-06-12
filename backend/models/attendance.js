const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    entrenamiento: {type: mongoose.Schema.Types.ObjectId, ref: 'Training', required: true},
    jugador: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    asiste: {type: Boolean, required: true},
}, {timestamps: true});

module.exports = mongoose.model('Attendance', attendanceSchema);
