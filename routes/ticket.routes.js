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
import { restrictToOwn } from '../middlewares/clientRole.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { ticketSchema } from '../validators/index.validator.js';

const router = express.Router();

router.use(protect);

const prePopulateTicketBody = async (req, res, next) => {
  try {
    if (req.body.client) {
      req.body.client = req.body.client;
    }
    if (!req.body.ticketId) {
      req.body.ticketId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
    }
    next();
  } catch (error) {
    next(error);
  }
};

router.route('/')
  .get(restrictToOwn, getTickets)
  .post(restrictToOwn, prePopulateTicketBody, validateRequest(ticketSchema), createTicket);

router.route('/:id')
  .get(getTicket)
  .put(updateTicket)
  .delete(isAdminStaff, authorize('Super Admin', 'Admin'), deleteTicket);

router.post('/:id/reply', replyToTicket);

export default router;
