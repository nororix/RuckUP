const Attendance = require('../models/attendance');

exports.createAttendance = async (req, res) => {
    try {
        const { training } = req.body;

        const attendance = await Attendance.create({
            training,
            player: req.user.id,
            present: true
        });

        res.status(201).json(attendance);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAllAttendances = async (req, res) => {
    try {
        const attendances = await Attendance.find()
            .populate('player', 'name')
            .populate('training', 'title date');
        res.status(200).json(attendances);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAttendancesByPlayer = async (req, res) => {
    try {
        const attendances = await Attendance.find({ player: req.params.id })
            .populate('training', 'title date');
        res.status(200).json(attendances);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateAttendance = async (req, res) => {
    try {
        const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Attendance not found' });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAttendance = async (req, res) => {
    try {
        const deleted = await Attendance.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Not found' });
        res.status(200).json({ message: 'Attendance successfully deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAttendanceByTraining = async (req, res) => {
    try {
        const attendances = await Attendance.find({ training: req.params.trainingId })
            .populate('player', 'name email')
            .populate('training', 'title date');
        res.status(200).json(attendances);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
