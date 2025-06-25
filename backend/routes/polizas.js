import express from 'express';
import Poliza from '../models/Poliza.js';

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const nuevaPoliza = new Poliza(req.body);
    await nuevaPoliza.save();
    res.status(201).json(nuevaPoliza);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const polizas = await Poliza.find();
    res.json(polizas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const poliza = await Poliza.findById(req.params.id);
    if (!poliza) return res.status(404).json({ error: 'No encontrada' });
    res.json(poliza);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Poliza.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!actualizada) return res.status(404).json({ error: 'No encontrada' });
    res.json(actualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const eliminada = await Poliza.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ error: 'No encontrada' });
    res.json({ mensaje: 'Póliza eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;