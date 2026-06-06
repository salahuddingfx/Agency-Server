import Ticket from '../models/ticket.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getTickets = factory.getAll(Ticket, 'client');
export const getTicket = factory.getOne(Ticket, 'client');
export const createTicket = factory.createOne(Ticket);
export const updateTicket = factory.updateOne(Ticket);
export const deleteTicket = factory.deleteOne(Ticket);

export const replyToTicket = async (req, res, next) => {
  try {
    const { sender, text } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    ticket.messages.push({
      sender,
      text,
      time: new Date(),
    });

    await ticket.save();

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};
