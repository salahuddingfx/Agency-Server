import Joi from 'joi';

export const serviceSchema = Joi.object({
  title: Joi.string().required().min(3),
  category: Joi.string().required(),
  metric: Joi.string().required(),
  status: Joi.string().valid('Draft', 'Published'),
  shortDesc: Joi.string().required(),
  longDesc: Joi.string().allow(''),
});

export const portfolioSchema = Joi.object({
  title: Joi.string().required().min(3),
  category: Joi.string().required(),
  client: Joi.string().required(),
  featured: Joi.boolean(),
  imageColor: Joi.string().allow(''),
  imageUrl: Joi.string().allow(''),
  description: Joi.string().allow(''),
});

export const caseStudySchema = Joi.object({
  title: Joi.string().required(),
  client: Joi.string().required(),
  status: Joi.string().valid('Draft', 'Published'),
  problem: Joi.string().required(),
  solution: Joi.string().required(),
  result: Joi.string().required(),
});

export const blogSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  category: Joi.string().required(),
  status: Joi.string().valid('Draft', 'Published'),
  metaTitle: Joi.string().allow(''),
  metaDesc: Joi.string().allow(''),
  content: Joi.string().allow(''),
  tags: Joi.array().items(Joi.string()),
});

export const teamSchema = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().required(),
  experience: Joi.string().required(),
  skills: Joi.string().required(),
  avatarUrl: Joi.string().allow(''),
});

export const techSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  desc: Joi.string().allow(''),
  iconSvg: Joi.string().allow(''),
});

export const testimonialSchema = Joi.object({
  name: Joi.string().required(),
  company: Joi.string().required(),
  text: Joi.string().required(),
  stars: Joi.number().min(1).max(5),
});

export const careerSchema = Joi.object({
  title: Joi.string().required(),
  department: Joi.string().required(),
  status: Joi.string().valid('Open', 'Closed'),
  salary: Joi.string().required(),
  description: Joi.string().allow(''),
  requirements: Joi.array().items(Joi.string()),
});

export const applicationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  roleApplied: Joi.string().required(),
  status: Joi.string().valid('Pending', 'Screened', 'Interviewing', 'Offered', 'Rejected'),
  fileUrl: Joi.string().required(),
  coverLetter: Joi.string().allow(''),
});

export const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  subject: Joi.string().required(),
  text: Joi.string().required(),
});

export const leadSchema = Joi.object({
  company: Joi.string().required(),
  contactName: Joi.string().required(),
  email: Joi.string().email().required(),
  value: Joi.string().required(),
  status: Joi.string().valid('New', 'Contacted', 'Proposal', 'Won', 'Lost'),
  assignee: Joi.string().allow(''),
  notes: Joi.array().items(Joi.string()),
});

export const clientSchema = Joi.object({
  name: Joi.string().required(),
  company: Joi.string().required(),
  email: Joi.string().email().required(),
  activeProject: Joi.string().allow(''),
  invoicesCount: Joi.number(),
  supportStatus: Joi.string().allow(''),
});

export const projectSchema = Joi.object({
  title: Joi.string().required(),
  client: Joi.string().required(), // Client ID mapping
  status: Joi.string().valid('Planning', 'In Progress', 'Review', 'Completed'),
  progress: Joi.number().min(0).max(100),
  description: Joi.string().allow(''),
  milestones: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      date: Joi.string().required(),
      status: Joi.string().valid('upcoming', 'current', 'completed'),
    })
  ),
});

export const invoiceSchema = Joi.object({
  invoiceId: Joi.string().required(),
  client: Joi.string().required(), // Client ID mapping
  project: Joi.string().required(),
  amount: Joi.string().required(),
  date: Joi.string().required(),
  status: Joi.string().valid('Paid', 'Unpaid'),
});

export const ticketSchema = Joi.object({
  ticketId: Joi.string().required(),
  client: Joi.string().required(), // Client ID mapping
  subject: Joi.string().required(),
  category: Joi.string().allow(''),
  urgency: Joi.string().valid('Low', 'Medium', 'High'),
  status: Joi.string().valid('Open', 'In Progress', 'Resolved', 'Closed'),
});

export const settingsSchema = Joi.object({
  siteName: Joi.string().allow(''),
  logoText: Joi.string().allow(''),
  faviconSvg: Joi.string().allow(''),
  footerText: Joi.string().allow(''),
  socialTwitter: Joi.string().allow(''),
  socialLinkedin: Joi.string().allow(''),
  socialGithub: Joi.string().allow(''),
  globalSeoTitle: Joi.string().allow(''),
  globalSeoDesc: Joi.string().allow(''),
  globalSchema: Joi.string().allow(''),
});
