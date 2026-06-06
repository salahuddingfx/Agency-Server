import express from 'express';
import {
  getPortfolios,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from '../controllers/portfolio.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/role.middleware.js';
import { isAdminStaff } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validate.middleware.js';
import { portfolioSchema } from '../validators/index.validator.js';

const router = express.Router();

router.get('/', getPortfolios);
router.get('/:id', getPortfolio);

router.use(protect);
router.use(isAdminStaff);
router.use(authorize('Super Admin', 'Admin', 'Manager', 'Editor'));

router.post('/', validateRequest(portfolioSchema), createPortfolio);
router.put('/:id', validateRequest(portfolioSchema), updatePortfolio);
router.delete('/:id', deletePortfolio);

export default router;
