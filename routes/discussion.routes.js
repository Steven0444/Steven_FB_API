import express from 'express';
import Discussion from '../models/discussion.model.js';

const router = express.Router();

// Créer un fil de discussion pour un groupe ou un événement
router.post('/', async (req, res) => {
  try {
    const newDiscussion = new Discussion(req.body);
    const saved = await newDiscussion.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Récupérer le fil de discussion d'une cible spécifique (groupe ou événement)
router.get('/target/:targetId', async (req, res) => {
  try {
    const discussion = await Discussion.findOne({ targetId: req.params.targetId })
      .populate('messages.sender messages.comments.sender');
    res.status(200).json(discussion || { message: 'Aucune discussion trouvée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter un message dans un fil de discussion
router.post('/:id/message', async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ message: 'Discussion non trouvée' });

    discussion.messages.push(req.body);
    await discussion.save();
    res.status(200).json(discussion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;