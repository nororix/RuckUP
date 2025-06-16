const express = require('express');
const router = express.Router();
const attendanceCtrl = require('../controllers/attendance.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, attendanceCtrl.createAttendance);
router.get('/', attendanceCtrl.getAllAttendances);
router.get('/player/:id', attendanceCtrl.getAttendancesByPlayer);
router.get('/training/:trainingId', authMiddleware, roleMiddleware(['coach', 'player']), attendanceCtrl.getAttendanceByTraining);
router.put('/:id', attendanceCtrl.updateAttendance);
router.delete('/:id', attendanceCtrl.deleteAttendance);

module.exports = router;
