import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { uploadAsset } from './cloudinary.service.js';

/**
 * Generates a branded PDF for an invoice, uploads it, and returns the URL.
 * @param {Object} invoice - The invoice document.
 * @param {Object} client - The client document associated with the invoice.
 * @returns {Promise<string>} The uploaded PDF URL.
 */
export const generateInvoicePdf = async (invoice, client) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'A4' });
      
      // Temporary file path in server root (will be deleted by uploadAsset)
      const tempFilename = `temp-invoice-${invoice._id || Date.now()}.pdf`;
      const tempFilePath = path.join(process.cwd(), tempFilename);
      
      const writeStream = fs.createWriteStream(tempFilePath);
      doc.pipe(writeStream);

      // --- BRAND LOGO ---
      // Draw Nextora background blue circle
      doc.save();
      doc.translate(50, 45);
      doc.circle(20, 20, 20).fill('#18B7F5');
      // Draw white wave shape inside the circle
      doc.path('M 4 22 L 13 22 C 14.5 22, 15.5 13.5, 17 13.5 C 19.5 13.5, 21 26.5, 23.5 26.5 C 25 26.5, 26 18, 27.5 18 L 36 18')
         .lineWidth(3.5)
         .lineCap('round')
         .lineJoin('round')
         .stroke('#FFFFFF');
      doc.restore();

      // --- HEADER DETAILS ---
      doc.fillColor('#0f172a')
         .font('Helvetica-Bold')
         .fontSize(20)
         .text('NEXTORA STUDIO', 100, 45);
         
      doc.fillColor('#64748b')
         .font('Helvetica')
         .fontSize(9)
         .text('Where Ideas Take Shape', 100, 68);

      // --- INVOICE TITLE & META (Right Aligned) ---
      doc.fillColor('#0f172a')
         .font('Helvetica-Bold')
         .fontSize(22)
         .text('INVOICE', 350, 45, { align: 'right', width: 200 });

      doc.fillColor('#334155')
         .font('Helvetica-Bold')
         .fontSize(9)
         .text('Invoice ID: ', 350, 75, { align: 'right', width: 120 })
         .font('Helvetica')
         .text(String(invoice.invoiceId), 470, 75, { align: 'right', width: 80 });

      doc.font('Helvetica-Bold')
         .text('Date: ', 350, 90, { align: 'right', width: 120 })
         .font('Helvetica')
         .text(String(invoice.date), 470, 90, { align: 'right', width: 80 });

      const statusColor = invoice.status === 'Paid' ? '#10b981' : '#f59e0b';
      doc.font('Helvetica-Bold')
         .text('Status: ', 350, 105, { align: 'right', width: 120 })
         .fillColor(statusColor)
         .text(invoice.status ? invoice.status.toUpperCase() : 'UNPAID', 470, 105, { align: 'right', width: 80 });

      // Divider line
      doc.strokeColor('#cbd5e1')
         .lineWidth(1)
         .moveTo(50, 135)
         .lineTo(550, 135)
         .stroke();

      // --- BILLING INFORMATION ---
      // Billed To (Client)
      doc.fillColor('#0f172a')
         .font('Helvetica-Bold')
         .fontSize(10)
         .text('BILLED TO:', 50, 155);

      doc.fillColor('#334155')
         .font('Helvetica-Bold')
         .fontSize(11)
         .text(client.name || 'Client Contact', 50, 175)
         .font('Helvetica')
         .fontSize(9)
         .text(client.company || 'Client Company', 50, 192)
         .text(client.email || 'client@email.com', 50, 207);

      // Billed From (Agency)
      doc.fillColor('#0f172a')
         .font('Helvetica-Bold')
         .fontSize(10)
         .text('FROM:', 350, 155);

      doc.fillColor('#334155')
         .font('Helvetica-Bold')
         .fontSize(11)
         .text('Nextora Studio', 350, 175)
         .font('Helvetica')
         .fontSize(9)
         .text('Premium Digital & Software Solutions', 350, 192)
         .text('info.salahuddinkader@gmail.com', 350, 207);

      // --- ITEMS TABLE ---
      const tableTop = 250;
      
      // Table Header Background
      doc.rect(50, tableTop, 500, 25).fill('#0f172a');

      // Table Header Text
      doc.fillColor('#ffffff')
         .font('Helvetica-Bold')
         .fontSize(9)
         .text('Project / Service Description', 60, tableTop + 8, { width: 340 })
         .text('Amount Due', 400, tableTop + 8, { align: 'right', width: 140 });

      // Table Row
      const rowTop = tableTop + 25;
      doc.fillColor('#0f172a')
         .rect(50, rowTop, 500, 40)
         .fill('#f8fafc'); // Light background for items

      doc.strokeColor('#e2e8f0')
         .lineWidth(1)
         .moveTo(50, rowTop + 40)
         .lineTo(550, rowTop + 40)
         .stroke();

      doc.fillColor('#1e293b')
         .font('Helvetica-Bold')
         .fontSize(10)
         .text(invoice.project || 'Project Milestones', 60, rowTop + 14, { width: 340 });

      doc.fillColor('#2563eb')
         .font('Helvetica-Bold')
         .fontSize(12)
         .text(invoice.amount || '$0.00', 400, rowTop + 13, { align: 'right', width: 140 });

      // --- TOTAL AMOUNT ---
      const totalTop = rowTop + 60;
      doc.fillColor('#475569')
         .font('Helvetica-Bold')
         .fontSize(10)
         .text('Total Amount:', 320, totalTop, { align: 'right', width: 100 });

      doc.fillColor('#18B7F5')
         .font('Helvetica-Bold')
         .fontSize(16)
         .text(invoice.amount || '$0.00', 430, totalTop - 4, { align: 'right', width: 110 });

      // --- TERMS & PAYMENTS ---
      const notesTop = totalTop + 60;
      doc.fillColor('#0f172a')
         .font('Helvetica-Bold')
         .fontSize(10)
         .text('Payment Terms & Instructions', 50, notesTop);

      doc.fillColor('#475569')
         .font('Helvetica')
         .fontSize(8.5)
         .text('1. Please pay this invoice within 14 days of receipt date.', 50, notesTop + 18, { width: 450 })
         .text('2. Payments can be settled via bank transfer or direct online link.', 50, notesTop + 30, { width: 450 })
         .text('3. For support or queries, contact us at info.salahuddinkader@gmail.com.', 50, notesTop + 42, { width: 450 });

      // --- FOOTER TAGLINE (Fixed at bottom of page) ---
      const footerY = doc.page.height - 70;
      doc.strokeColor('#cbd5e1')
         .lineWidth(1)
         .moveTo(50, footerY)
         .lineTo(550, footerY)
         .stroke();

      doc.fillColor('#64748b')
         .font('Helvetica-Oblique')
         .fontSize(9)
         .text('Nextora Studio  |  Where Ideas Take Shape', 50, footerY + 15, { align: 'center', width: 500 });

      doc.end();

      writeStream.on('finish', async () => {
        try {
          console.log(`PDF generated locally: ${tempFilePath}`);
          // Upload to Cloudinary using standard helper
          const result = await uploadAsset(tempFilePath, 'invoices');
          resolve(result.url);
        } catch (uploadError) {
          reject(uploadError);
        }
      });

      writeStream.on('error', (err) => {
        reject(err);
      });
    } catch (err) {
      reject(err);
    }
  });
};
