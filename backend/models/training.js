const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    duration: { type: Number },
    location: { type: String },
    type: {
        type: String,
        enum: ['fitness', 'contact', 'general movement', 'technical', 'other'],
        default: 'other'
    },
    category: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Training', trainingSchema);
