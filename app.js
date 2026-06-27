import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import path from 'path';
import env from './config/env.config.js';
import corsConfig from './config/cors.config.js';
import { requestLogger } from './middlewares/logger.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import notFound from './middlewares/notFound.middleware.js';
import { apiLimiter } from './middlewares/rateLimit.middleware.js';
import { swaggerDocument } from './config/swagger.config.js';
import swaggerUi from 'swagger-ui-express';

// Import Routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import serviceRoutes from './routes/service.routes.js';
import portfolioRoutes from './routes/portfolio.routes.js';
import caseStudyRoutes from './routes/caseStudy.routes.js';
import blogRoutes from './routes/blog.routes.js';
import teamRoutes from './routes/team.routes.js';
import technologyRoutes from './routes/technology.routes.js';
import testimonialRoutes from './routes/testimonial.routes.js';
import careerRoutes from './routes/career.routes.js';
import applicationRoutes from './routes/application.routes.js';
import contactRoutes from './routes/contact.routes.js';
import leadRoutes from './routes/lead.routes.js';
import clientRoutes from './routes/client.routes.js';
import projectRoutes from './routes/project.routes.js';
import invoiceRoutes from './routes/invoice.routes.js';
import ticketRoutes from './routes/ticket.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import uploadRoutes from './routes/upload.routes.js';

const app = express();

// Enable CORS
app.use(corsConfig);

// Mount Security headers
app.use(helmet());

// Mongo injection sanitization
app.use(mongoSanitize());

// Custom XSS Sanitizer Middleware
app.use((req, res, next) => {
  const sanitizeValue = (val) => {
    if (typeof val === 'string') {
      return val.replace(/<[^>]*>?/gm, ''); // Strip HTML tags
    }
    if (Array.isArray(val)) {
      return val.map(sanitizeValue);
    }
    if (val !== null && typeof val === 'object') {
      const obj = {};
      Object.keys(val).forEach((k) => {
        obj[k] = sanitizeValue(val[k]);
      });
      return obj;
    }
    return val;
  };
  if (req.body) {
    req.body = sanitizeValue(req.body);
  }
  next();
});

// Custom Cookies Parser Middleware
app.use((req, res, next) => {
  const cookies = {};
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    cookieHeader.split(';').forEach((cookie) => {
      const parts = cookie.split('=');
      cookies[parts.shift().trim()] = decodeURIComponent(parts.join('='));
    });
  }
  req.cookies = cookies;
  next();
});

// Parsing bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP Request Logger
app.use(requestLogger);

// Static uploads serving
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Swagger API Documentation — development only, hidden in production
if (env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

// Mount routes onto API endpoints
const routerPrefix = '/api/v1';
app.use(`${routerPrefix}/auth`, authRoutes);
app.use(`${routerPrefix}/users`, apiLimiter, userRoutes);
app.use(`${routerPrefix}/admins`, apiLimiter, adminRoutes);
app.use(`${routerPrefix}/services`, apiLimiter, serviceRoutes);
app.use(`${routerPrefix}/portfolios`, apiLimiter, portfolioRoutes);
app.use(`${routerPrefix}/case-studies`, apiLimiter, caseStudyRoutes);
app.use(`${routerPrefix}/blogs`, apiLimiter, blogRoutes);
app.use(`${routerPrefix}/teams`, apiLimiter, teamRoutes);
app.use(`${routerPrefix}/technologies`, apiLimiter, technologyRoutes);
app.use(`${routerPrefix}/testimonials`, apiLimiter, testimonialRoutes);
app.use(`${routerPrefix}/careers`, apiLimiter, careerRoutes);
app.use(`${routerPrefix}/applications`, apiLimiter, applicationRoutes);
app.use(`${routerPrefix}/contacts`, apiLimiter, contactRoutes);
app.use(`${routerPrefix}/leads`, apiLimiter, leadRoutes);
app.use(`${routerPrefix}/clients`, apiLimiter, clientRoutes);
app.use(`${routerPrefix}/projects`, apiLimiter, projectRoutes);
app.use(`${routerPrefix}/invoices`, apiLimiter, invoiceRoutes);
app.use(`${routerPrefix}/tickets`, apiLimiter, ticketRoutes);
app.use(`${routerPrefix}/settings`, apiLimiter, settingsRoutes);
app.use(`${routerPrefix}/upload`, apiLimiter, uploadRoutes);

// Base Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Nextora Studio API Gateway is live.',
    ...(env.NODE_ENV !== 'production' && { documentation: '/api-docs' }),
  });
});

// Health Check — for uptime monitors (UptimeRobot, Better Uptime, etc.)
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()) + 's',
    environment: env.NODE_ENV,
  });
});

// Route 404 Interceptor
app.use(notFound);

// Central error handler
app.use(errorHandler);

export default app;
