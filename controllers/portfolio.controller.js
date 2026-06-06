import Portfolio from '../models/portfolio.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getPortfolios = factory.getAll(Portfolio);
export const getPortfolio = factory.getOne(Portfolio);
export const createPortfolio = factory.createOne(Portfolio);
export const updatePortfolio = factory.updateOne(Portfolio);
export const deletePortfolio = factory.deleteOne(Portfolio);
