import express from 'express';
import {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from '../controllers/invoice.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { invoiceSchema } from '../validators/index.validator.js';
import Client from '../models/client.model.js';

const router = express.Router();

router.use(protect);

const restrictClientInvoices = async (req, res, next) => {
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
  .get(restrictClientInvoices, getInvoices)
  .post(isAdminStaff, authorize('Super Admin', 'Admin', 'Manager'), validateRequest(invoiceSchema), createInvoice);

router.route('/:id')
  .get(getInvoice)
  .put(isAdminStaff, authorize('Super Admin', 'Admin', 'Manager'), validateRequest(invoiceSchema), updateInvoice)
  .delete(isAdminStaff, authorize('Super Admin', 'Admin', 'Manager'), deleteInvoice);

export default router;
