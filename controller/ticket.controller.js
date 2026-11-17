const { TicketType, PurchasedTicket } = require('../models/ticket.model');

exports.createTicketType = async (req, res) => {
  try {
    const ticketType = new TicketType(req.body);
    await ticketType.save();
    res.status(201).json(ticketType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.buyTicket = async (req, res) => {
  try {
    const { ticketTypeId, firstName, lastName, fullAddress } = req.body;
    const ticketType = await TicketType.findById(ticketTypeId);
    if (!ticketType) return res.status(404).json({ error: 'Type de billet introuvable.' });

    const count = await PurchasedTicket.countDocuments({ ticketType: ticketTypeId });
    if (count >= ticketType.quantityLimit) {
      return res.status(400).json({ error: 'Plus de billets disponibles.' });
    }

    const purchased = new PurchasedTicket({ ticketType: ticketTypeId, firstName, lastName, fullAddress });
    await purchased.save();
    res.status(201).json({ message: 'Billet acheté avec succès', purchased });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Vous avez déjà acheté ce billet.' });
    }
    res.status(500).json({ error: error.message });
  }
};