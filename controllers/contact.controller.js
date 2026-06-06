import Contact from '../models/contact.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getContacts = factory.getAll(Contact);
export const getContact = factory.getOne(Contact);
export const createContact = factory.createOne(Contact);
export const updateContact = factory.updateOne(Contact);
export const deleteContact = factory.deleteOne(Contact);
