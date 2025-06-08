const express =require('express');
const mongoose =require('mongoose');
const cors = require('cors');
require ('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req, res)=>{
    res.send('Ruck Up server running');
});

const trainingRoutes = require('./routes/trainings');
const attendanceRoutes = require('./routes/attendances');
const authRoutes = require ('./routes/authRoutes');

app.use('/api/trainings', trainingRoutes);
app.use('/api/attendances',attendanceRoutes);
app.use('/api/auth',authRoutes);  

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)

.then(()=>{
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () =>{
        console.log(`Server listening on http://localhost:${PORT}`);
    });
})

.catch ((error)=>{
    console.log('Error connecting to MongoDB', error);
}); 