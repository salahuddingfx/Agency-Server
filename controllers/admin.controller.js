import Admin from '../models/admin.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getAdmins = factory.getAll(Admin);
export const getAdmin = factory.getOne(Admin);
export const createAdmin = factory.createOne(Admin);
export const updateAdmin = factory.updateOne(Admin);
export const deleteAdmin = factory.deleteOne(Admin);
