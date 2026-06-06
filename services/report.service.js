import Lead from '../models/lead.model.js';
import Project from '../models/project.model.js';
import Invoice from '../models/invoice.model.js';

export const buildCSVReport = async (type) => {
  let data = [];
  if (type === 'leads') {
    data = await Lead.find({});
  } else if (type === 'projects') {
    data = await Project.find({}).populate('client');
  } else if (type === 'invoices') {
    data = await Invoice.find({}).populate('client');
  }

  // Format into a simulated CSV text block
  let csv = 'ID,Created,Details\n';
  data.forEach((item) => {
    csv += `${item._id},${item.createdAt},${item.toString().substring(0, 50)}\n`;
  });

  return csv;
};
