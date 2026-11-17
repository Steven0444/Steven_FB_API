import express from 'express';
import Carpool from '../models/carpool.model.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const carpool = new Carpool(req.body);
    const saved = await carpool.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/event/:eventId', async (req, res) => {
  try {
    const carpools = await Carpool.find({ event: req.params.eventId }).populate('driver');
    res.status(200).json(carpools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;