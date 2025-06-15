const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    training: { type: mongoose.Schema.Types.ObjectId, ref: 'Training', required: true },
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    present: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
