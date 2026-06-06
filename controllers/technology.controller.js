import Technology from '../models/technology.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getTechnologies = factory.getAll(Technology);
export const getTechnology = factory.getOne(Technology);
export const createTechnology = factory.createOne(Technology);
export const updateTechnology = factory.updateOne(Technology);
export const deleteTechnology = factory.deleteOne(Technology);
