const express = require('express');
const router = express.Router();
const trainingCtrl = require('../controllers/training.controller');

router.post('/', trainingCtrl.createTraining);
router.get('/', trainingCtrl.getAllTrainings);
router.get('/:id', trainingCtrl.getTrainingById);
router.put('/:id', trainingCtrl.updateTraining);
router.delete('/:id', trainingCtrl.deleteTraining);

module.exports = router;