import Service from '../models/service.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getServices = factory.getAll(Service);
export const getService = factory.getOne(Service);
export const createService = factory.createOne(Service);
export const updateService = factory.updateOne(Service);
export const deleteService = factory.deleteOne(Service);
