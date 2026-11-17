const Carpool = require('../models/carpool.model');

exports.createCarpool = async (req, res) => {
  try {
    const carpool = new Carpool({ ...req.body, user: req.user.userId });
    await carpool.save();
    res.status(201).json(carpool);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCarpoolsByEvent = async (req, res) => {
  try {
    const carpools = await Carpool.find({ event: req.params.eventId }).populate('user');
    res.status(200).json(carpools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCarpool = async (req, res) => {
  try {
    await Carpool.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Covoiturage supprimé.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};