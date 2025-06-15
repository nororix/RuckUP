require('dotenv').config();
const mongoose = require('mongoose');

// Importa tus modelos
const User = require('./models/user');
const Training = require('./models/training');

async function checkDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    const users = await User.find();
    console.log('📦 Usuarios encontrados:', users);

    const trainings = await Training.find();
    console.log('🏋️‍♀️ Entrenamientos encontrados:', trainings);

    process.exit(); // Termina el script
  } catch (error) {
    console.error('❌ Error al conectar o consultar la base de datos:', error);
    process.exit(1);
  }
}

checkDB();
