import express from 'express';
import {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  replyToTicket,
} from '../controllers/ticket.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { ticketSchema } from '../validators/index.validator.js';
import Client from '../models/client.model.js';

const router = express.Router();

router.use(protect);

const restrictClientTickets = async (req, res, next) => {
  if (req.user.role === 'client') {
    const client = await Client.findOne({ userId: req.user._id });
    if (!client) {
      return res.status(403).json({ success: false, message: 'No client profile bound to account.' });
    }
    req.query.client = client._id.toString();
  }
  next();
};

router.route('/')
  .get(restrictClientTickets, getTickets)
  .post(validateRequest(ticketSchema), createTicket);

router.route('/:id')
  .get(getTicket)
  .put(updateTicket)
  .delete(isAdminStaff, authorize('Super Admin', 'Admin'), deleteTicket);

router.post('/:id/reply', replyToTicket);

export default router;
