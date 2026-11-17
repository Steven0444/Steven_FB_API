import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String },
  coverPhoto: { type: String },
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },
  organizers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);