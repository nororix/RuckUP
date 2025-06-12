const Attendance = require('../models/attendance');

exports.createAttendance = async (req, res) => {
    try{
        const attendance = await Attendance.create(req.body);
        res.status(201).json(attendance);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

exports.getAllAttendances = async (req, res) =>{
    try{
        const attendances = await Attendance.find ()
            .populate('jugador', 'nombre')
            .populate('entrenamiento', 'titulo fecha');
        res.status(200).json(attendances);

    }catch (err) {
        res.status (500).json({error: err.message});
    }
};

exports.getAttendancesByPlayer = async (req, res) => {
    try{
        const attendances = await Attendance.find({ jugador: req.params.id})
            .populate('entrenamiento', 'titulo fecha');
        res.status(200).json(attendances);
    } catch (err){
        res.status (500).json({error:err.message});
    }
};

exports.updateAttendance = async (req, res) => {
    try{
        const updated = await Attendance.findByIdAndUpdate (req.params.id, req.body, {new: true});
        if (!updated) return res.status(404).json({ error: 'Asistencia no encontrada' });
        res.status(200).json(updated);
    }catch (err){
        res.status(500).json({error: err.message});
    }
};

exports.deleteAttendance = async (req, res) =>{
    try{
        const deleted = await Attendance.findByIdAndDelete (req.params.id);
        if(!deleted) return res.status(404).json({ error: 'No encontrado' });
        res.status(200).json({ message: 'Asistencia eliminada correctamente' });
    }catch (err) {
        res.status (500).json({error: err.message});
    }
};

exports.getAttendanceByTraining = async (req, res) => {
  try {
    const attendances = await Attendance.find({ entrenamiento: req.params.trainingId })
      .populate('jugador', 'nombre email')
      .populate('entrenamiento', 'titulo fecha');

    res.status(200).json(attendances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}