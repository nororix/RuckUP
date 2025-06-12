const Training = require('../models/training');

exports.createTraining = async (req, res) =>{
    try{
        const training = await Training.create(req.body);
        res.status(201).json(training);
    } catch(err){
        res.status(400).json({error: err.message});
    }
};

exports.getAllTrainings = async (req,res) =>{
    try{
        const trainings = await Training.find().populate('creadoPor', 'nombre');
        res.status(200).json(trainings);
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.getTrainingById = async (req, res) =>{
    try{
        const training = await Training.findById(req.params.id).populate('creadoPor', 'nombre');
        if(!training) return res.status(404).json({error: 'No encontrado'});
        res.status(200).json(training);
    } catch(err){
        res.status(500).json({error: err.message});
    }
};

exports.updateTraining = async (req,res) =>{
    try{
        const updated = await Training.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updated) return res.status(404).json({error: 'No encontrado'});
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.deleteTraining = async (req, res) => {
    try{
        const deleted = await Training.findByIdAndDelete (req.params.id);
        if (!deleted) return res.status (404).json({error: 'No encontrado'});
        res.status(200).json({message: 'Eliminado correctamente'});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};