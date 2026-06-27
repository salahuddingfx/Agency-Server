import Contact from '../models/contact.model.js';
import * as factory from '../helpers/factory.helper.js';

import { sendContactEmail } from '../services/mail.service.js';

export const getContacts = factory.getAll(Contact);
export const getContact = factory.getOne(Contact);

export const createContact = async (req, res, next) => {
  try {
    const doc = await Contact.create(req.body);
    
    // Trigger notification and receipt emails
    sendContactEmail(doc).catch((err) => {
      console.error('Contact email delivery failed:', err.message);
    });

    res.status(201).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = factory.updateOne(Contact);
export const deleteContact = factory.deleteOne(Contact);
