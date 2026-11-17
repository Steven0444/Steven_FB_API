import mongoose from 'mongoose';

const carpoolSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  departureLocation: { type: String, required: true },
  departureTime: { type: Date, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  maxDetourTime: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Carpool', carpoolSchema);