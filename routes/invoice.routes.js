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
import { restrictToOwn } from '../middlewares/clientRole.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { invoiceSchema } from '../validators/index.validator.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(restrictToOwn, getInvoices)
  .post(isAdminStaff, authorize('Super Admin', 'Admin', 'Manager'), validateRequest(invoiceSchema), createInvoice);

router.route('/:id')
  .get(restrictToOwn, getInvoice)
  .put(isAdminStaff, authorize('Super Admin', 'Admin', 'Manager'), validateRequest(invoiceSchema), updateInvoice)
  .delete(isAdminStaff, authorize('Super Admin', 'Admin', 'Manager'), deleteInvoice);

export default router;
