import Client from '../models/client.model.js';
import * as factory from '../helpers/factory.helper.js';

export const getClients = factory.getAll(Client);
export const getClient = factory.getOne(Client, 'userId');
export const createClient = factory.createOne(Client);
export const updateClient = factory.updateOne(Client);
export const deleteClient = factory.deleteOne(Client);
