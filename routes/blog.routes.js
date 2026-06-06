import express from 'express';
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blog.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { blogSchema } from '../validators/index.validator.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlog);

router.use(protect);
router.use(isAdminStaff);
router.use(authorize('Super Admin', 'Admin', 'Manager', 'Editor'));

router.post('/', validateRequest(blogSchema), createBlog);
router.put('/:id', validateRequest(blogSchema), updateBlog);
router.delete('/:id', deleteBlog);

export default router;
