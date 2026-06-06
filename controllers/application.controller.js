import Application from '../models/application.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getApplications = factory.getAll(Application);
export const getApplication = factory.getOne(Application);
export const createApplication = factory.createOne(Application);
export const updateApplication = factory.updateOne(Application);
export const deleteApplication = factory.deleteOne(Application);
