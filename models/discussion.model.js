import mongoose from 'mongoose';

const discussionSchema = new mongoose.Schema({
  targetType: { type: String, enum: ['group', 'event'], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID du groupe ou de l'événement
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    comments: [{
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.model('Discussion', discussionSchema);