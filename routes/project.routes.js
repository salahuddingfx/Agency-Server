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
import { validateRequest } from '../middlewares/validate.middleware.js';
import { projectSchema } from '../validators/index.validator.js';
import Client from '../models/client.model.js';

const router = express.Router();

router.use(protect);

// Pre-filtering middleware for client users to restrict query scope
const restrictClientProjects = async (req, res, next) => {
  if (req.user.role === 'client') {
    const client = await Client.findOne({ userId: req.user._id });
    if (!client) {
      return res.status(403).json({ success: false, message: 'No client profile bound to account.' });
    }
    // Bind client query filter
    req.query.client = client._id.toString();
  }
  next();
};

router.route('/')
  .get(restrictClientProjects, getProjects)
  .post(isAdminStaff, authorize('Super Admin', 'Admin', 'Manager'), validateRequest(projectSchema), createProject);

router.route('/:id')
  .get(getProject)
  .put(isAdminStaff, authorize('Super Admin', 'Admin', 'Manager'), validateRequest(projectSchema), updateProject)
  .delete(isAdminStaff, authorize('Super Admin', 'Admin', 'Manager'), deleteProject);

export default router;
