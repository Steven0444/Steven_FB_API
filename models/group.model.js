import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  coverPhoto: { type: String },
  type: { type: String, enum: ['public', 'private', 'secret'], default: 'public' },
  allowMemberPosting: { type: Boolean, default: true },
  allowMemberEvents: { type: Boolean, default: true },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model('Group', groupSchema);