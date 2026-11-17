const Album = require('../models/album.model');

exports.createAlbum = async (req, res) => {
  try {
    const album = new Album(req.body);
    await album.save();
    res.status(201).json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAlbumsByEvent = async (req, res) => {
  try {
    const albums = await Album.find({ event: req.params.eventId }).populate('photos.author photos.comments.author');
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addPhoto = async (req, res) => {
  try {
    const { url } = req.body;
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album non trouvé.' });
    album.photos.push({ author: req.user.userId, url });
    await album.save();
    res.status(200).json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addCommentToPhoto = async (req, res) => {
  try {
    const { photoId, content } = req.body;
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ error: 'Album non trouvé.' });
    const photo = album.photos.id(photoId);
    if (!photo) return res.status(404).json({ error: 'Photo non trouvée.' });
    photo.comments.push({ author: req.user.userId, content });
    await album.save();
    res.status(200).json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    await Album.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Album supprimé.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};