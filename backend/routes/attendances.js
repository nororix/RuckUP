const express = require('express');
const router = express.Router();
const attendanceCtrl = require('../controllers/attendance.controller');

router.post('/', attendanceCtrl.createAttendance);
router.get('/', attendanceCtrl.getAllAttendances);
router.get('/jugador/:id', attendanceCtrl.getAttendancesByPlayer);
router.get('/entrenamiento/:trainingId', attendanceCtrl.getAttendanceByTraining)
router.put('/:id', attendanceCtrl.updateAttendance);
router.delete('/:id', attendanceCtrl.deleteAttendance);

module.exports = router;