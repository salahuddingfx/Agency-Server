import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
} from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/me', getMe);
router.put('/me', upload.single('avatar'), updateMe);

// Gated routes for Admin Staff only
router.use(isAdminStaff);
router.use(authorize('Super Admin', 'Admin'));

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;
