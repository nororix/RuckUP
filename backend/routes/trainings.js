const express = require('express');
const router = express.Router();
const trainingCtrl = require('../controllers/training.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', trainingCtrl.getAllTrainings);
router.get('/:id', trainingCtrl.getTrainingById);


router.post('/', authMiddleware, roleMiddleware(['entrenador']), trainingCtrl.createTraining);
router.put('/:id', authMiddleware, roleMiddleware(['entrenador']),trainingCtrl.updateTraining);
router.delete('/:id', authMiddleware, roleMiddleware(['entrenador']),trainingCtrl.deleteTraining);

module.exports = router;