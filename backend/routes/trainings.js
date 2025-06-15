const express = require('express');
const router = express.Router();
const trainingCtrl = require('../controllers/training.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/', trainingCtrl.getAllTrainings);
router.get('/:id', trainingCtrl.getTrainingById);

router.post('/', authMiddleware, roleMiddleware(['coach']), trainingCtrl.createTraining);
router.put('/:id', authMiddleware, roleMiddleware(['coach']), trainingCtrl.updateTraining);
router.delete('/:id', authMiddleware, roleMiddleware(['coach']), trainingCtrl.deleteTraining);

module.exports = router;
