const Poll = require('../models/poll.model');

exports.createPoll = async (req, res) => {
  try {
    const poll = new Poll({ ...req.body, creator: req.user.userId });
    await poll.save();
    res.status(201).json(poll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPollsByEvent = async (req, res) => {
  try {
    const polls = await Poll.find({ event: req.params.eventId });
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.votePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ error: 'Sondage non trouvé.' });
    res.status(200).json({ message: 'Vote enregistré.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePoll = async (req, res) => {
  try {
    await Poll.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Sondage supprimé.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};