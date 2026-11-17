import express from 'express';
import Album from '../models/album.model.js';

const router = express.Router();

// Créer un album pour un événement
router.post('/', async (req, res) => {
  try {
    const newAlbum = new Album(req.body);
    const saved = await newAlbum.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Récupérer l'album d'un événement
router.get('/event/:eventId', async (req, res) => {
  try {
    const album = await Album.findOne({ event: req.params.eventId })
      .populate('photos.postedBy photos.comments.sender');
    res.status(200).json(album || { message: 'Aucun album trouvé pour cet événement' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter une photo dans l'album
router.post('/:id/photo', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ message: 'Album non trouvé' });

    album.photos.push(req.body);
    await album.save();
    res.status(200).json(album);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;