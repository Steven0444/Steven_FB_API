const Group = require('../models/group.model');

exports.createGroup = async (req, res) => {
  try {
    const group = new Group({ ...req.body, admins: [req.user.userId], members: [req.user.userId] });
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('admins members');
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate('admins members');
    if (!group) return res.status(404).json({ error: 'Groupe non trouvé.' });
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(group);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Groupe supprimé.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};