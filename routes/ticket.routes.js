import express from 'express';
import Ticket from '../models/ticket.model.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const ticketConfig = new Ticket(req.body);
    const saved = await ticketConfig.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/:id/purchase', async (req, res) => {
  try {
    const ticketDoc = await Ticket.findById(req.params.id);
    if (!ticketDoc) return res.status(404).json({ message: 'Billetterie non trouvée' });

    ticketDoc.purchases.push(req.body);
    await ticketDoc.save();
    res.status(200).json(ticketDoc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;