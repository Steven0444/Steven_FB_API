import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  types: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    limit: { type: Number, required: true }
  }],
  purchases: [{
    ticketTypeName: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    purchaseDate: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);