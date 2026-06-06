import Service from '../models/service.model.js';
import Portfolio from '../models/portfolio.model.js';
import Blog from '../models/blog.model.js';
import Career from '../models/career.model.js';
import Application from '../models/application.model.js';
import Lead from '../models/lead.model.js';

export const getSystemOverviewStats = async () => {
  const [
    totalServices,
    totalProjects,
    totalBlogPosts,
    totalCareers,
    totalApplications,
    totalLeads,
  ] = await Promise.all([
    Service.countDocuments(),
    Portfolio.countDocuments(),
    Blog.countDocuments(),
    Career.countDocuments(),
    Application.countDocuments(),
    Lead.countDocuments(),
  ]);

  const leadsPipeline = await Lead.find({});
  const totalLeadsValue = leadsPipeline.reduce((acc, curr) => {
    // Parse numeric value if possible (e.g. '$75,000' -> 75000)
    const numericStr = curr.value.replace(/[^0-9.]/g, '');
    const val = parseFloat(numericStr) || 0;
    return acc + val;
  }, 0);

  return {
    metrics: {
      totalServices,
      totalProjects,
      totalBlogPosts,
      totalCareers,
      totalApplications,
      totalLeads,
      totalLeadsValue: `$${totalLeadsValue.toLocaleString()}`,
    },
    funnel: {
      newLeads: leadsPipeline.filter((l) => l.status === 'New').length,
      proposalSent: leadsPipeline.filter((l) => l.status === 'Proposal').length,
      won: leadsPipeline.filter((l) => l.status === 'Won').length,
      lost: leadsPipeline.filter((l) => l.status === 'Lost').length,
    },
  };
};
