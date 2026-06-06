import Lead from '../models/lead.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getLeads = factory.getAll(Lead);
export const getLead = factory.getOne(Lead);
export const createLead = factory.createOne(Lead);
export const updateLead = factory.updateOne(Lead);
export const deleteLead = factory.deleteOne(Lead);
