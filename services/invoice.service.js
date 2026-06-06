import Invoice from '../models/invoice.model.js';

export const compileInvoiceReceipt = async (invoiceId) => {
  const invoice = await Invoice.findOne({ invoiceId }).populate('client');
  if (!invoice) {
    throw new Error('Invoice not found');
  }

  // Returns standard formatted receipts payload
  return {
    receiptId: invoice.invoiceId,
    vendor: 'NEXTORA STUDIO INC.',
    client: invoice.client ? invoice.client.company : 'Direct Client',
    project: invoice.project,
    issuedDate: invoice.date,
    amount: invoice.amount,
    status: invoice.status,
    footer: 'Thank you for choosing Nextora Studio. For inquiry, reach support@nextora.tech.',
  };
};
