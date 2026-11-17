import express from 'express';
import Group from '../models/group.model.js';

const router = express.Router();

// CREATE - Créer un groupe
router.post('/', async (req, res) => {
  try {
    const newGroup = new Group(req.body);
    const savedGroup = await newGroup.save();
    res.status(201).json(savedGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ - Récupérer tous les groupes
router.get('/', async (req, res) => {
  try {
    const groups = await Group.find().populate('admins members');
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SHOW - Récupérer un groupe par ID
router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('admins members');
    if (!group) return res.status(404).json({ message: 'Groupe non trouvé' });
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE - Mettre à jour un groupe
router.put('/:id', async (req, res) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedGroup);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Supprimer un groupe
router.delete('/:id', async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Groupe supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;