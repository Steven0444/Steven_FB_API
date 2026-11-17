import mongoose from 'mongoose';

const pollSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{
    text: { type: String, required: true },
    options: [{
      text: { type: String, required: true },
      voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }]
  }]
}, { timestamps: true });

export default mongoose.model('Poll', pollSchema);