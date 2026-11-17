import express from 'express';
import Poll from '../models/poll.model.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newPoll = new Poll(req.body);
    const saved = await newPoll.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/event/:eventId', async (req, res) => {
  try {
    const polls = await Poll.find({ event: req.params.eventId }).populate('creator questions.options.voters');
    res.status(200).json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;