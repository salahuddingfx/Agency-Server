import Invoice from '../models/invoice.model.js';
import Client from '../models/client.model.js';
import * as factory from '../helpers/factory.helper.js';
import { sendInvoiceEmail } from '../services/mail.service.js';
import { generateInvoicePdf } from '../services/invoice.service.js';

export const getInvoices = factory.getAll(Invoice, 'client');
export const getInvoice = factory.getOne(Invoice, 'client');

export const createInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.create(req.body);
    
    // Find client to generate PDF and send email notification
    const client = await Client.findById(invoice.client);
    if (client) {
      try {
        const pdfUrl = await generateInvoicePdf(invoice, client);
        invoice.pdfUrl = pdfUrl;
        await invoice.save();
      } catch (pdfError) {
        console.error('PDF Generation failed during invoice creation:', pdfError.message);
      }

      if (client.email) {
        await sendInvoiceEmail(client.email, invoice);
      }
    }

    res.status(201).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    next(error);
  }
};

export const updateInvoice = factory.updateOne(Invoice);
export const deleteInvoice = factory.deleteOne(Invoice);
