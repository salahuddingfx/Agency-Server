import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/project.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import { restrictToOwn } from '../middlewares/clientRole.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { projectSchema } from '../validators/index.validator.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(restrictToOwn, getProjects)
  .post(isAdminStaff, authorize('Super Admin', 'Admin', 'Manager'), validateRequest(projectSchema), createProject);

router.route('/:id')
  .get(restrictToOwn, getProject)
  .put(isAdminStaff, authorize('Super Admin', 'Admin', 'Manager'), validateRequest(projectSchema), updateProject)
  .delete(isAdminStaff, authorize('Super Admin', 'Admin', 'Manager'), deleteProject);

export default router;
