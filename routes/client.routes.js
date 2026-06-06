import express from 'express';
import {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/client.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { clientSchema } from '../validators/index.validator.js';

const router = express.Router();

router.use(protect);
router.use(isAdminStaff);
router.use(authorize('Super Admin', 'Admin', 'Manager'));

router.route('/')
  .get(getClients)
  .post(validateRequest(clientSchema), createClient);

router.route('/:id')
  .get(getClient)
  .put(validateRequest(clientSchema), updateClient)
  .delete(deleteClient);

export default router;
