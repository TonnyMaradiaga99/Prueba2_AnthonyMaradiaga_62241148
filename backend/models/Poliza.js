import mongoose from 'mongoose';

const tiposValidos = ['Auto', 'Vida', 'Hogar', 'Salud'];

const polizaSchema = new mongoose.Schema({
  numeroPoliza: { type: String, required: true, unique: true },
  tipoSeguro: { type: String, required: true, enum: tiposValidos },
  titular: { type: String, required: true },
  monto: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Poliza', polizaSchema);