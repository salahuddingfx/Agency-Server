import express from 'express';
import {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
} from '../controllers/team.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { teamSchema } from '../validators/index.validator.js';

const router = express.Router();

router.get('/', getTeams);
router.get('/:id', getTeam);

router.use(protect);
router.use(isAdminStaff);
router.use(authorize('Super Admin', 'Admin', 'Manager', 'Editor'));

router.post('/', validateRequest(teamSchema), createTeam);
router.put('/:id', validateRequest(teamSchema), updateTeam);
router.delete('/:id', deleteTeam);

export default router;
