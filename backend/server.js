import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import polizasRoutes from './routes/polizas.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/polizas', polizasRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB Atlas');
  app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
}).catch((error) => console.error('Error al conectar a MongoDB:', error));