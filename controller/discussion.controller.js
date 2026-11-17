const Discussion = require('../models/discussion.model');

exports.createDiscussion = async (req, res) => {
  try {
    const { group, event } = req.body;
    if ((group && event) || (!group && !event)) {
      return res.status(400).json({ error: 'Un fil de discussion doit être lié soit à 1 groupe, soit à 1 événement, mais pas les deux.' });
    }
    const discussion = new Discussion(req.body);
    await discussion.save();
    res.status(201).json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().populate('group event messages.author messages.comments.author');
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ error: 'Fil de discussion non trouvé.' });
    discussion.messages.push({ author: req.user.userId, content });
    await discussion.save();
    res.status(200).json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addCommentToMessage = async (req, res) => {
  try {
    const { messageId, content } = req.body;
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) return res.status(404).json({ error: 'Fil non trouvé.' });
    const message = discussion.messages.id(messageId);
    if (!message) return res.status(404).json({ error: 'Message non trouvé.' });
    message.comments.push({ author: req.user.userId, content });
    await discussion.save();
    res.status(200).json(discussion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteDiscussion = async (req, res) => {
  try {
    await Discussion.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Fil de discussion supprimé.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};