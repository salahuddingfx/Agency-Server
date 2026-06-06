import Career from '../models/career.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getCareers = factory.getAll(Career);
export const getCareer = factory.getOne(Career);
export const createCareer = factory.createOne(Career);
export const updateCareer = factory.updateOne(Career);
export const deleteCareer = factory.deleteOne(Career);
