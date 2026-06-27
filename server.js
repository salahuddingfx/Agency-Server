import app from './app.js';
import connectDB from './config/db.config.js';
import env from './config/env.config.js';
import Admin from './models/admin.model.js';
import { printBanner } from './helpers/banner.helper.js';

// Print beautiful custom console banner
await printBanner();

// Connect to MongoDB
await connectDB();

// Seed initial administrative user if empty
const seedAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const seedEmail = env.ADMIN_SEED_EMAIL;
      const seedPassword = env.ADMIN_SEED_PASSWORD;
      if (!seedEmail || !seedPassword) {
        console.warn(`\x1b[1m[Seed]\x1b[0m \x1b[33mAdmin seed skipped — ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD not set in .env\x1b[0m`);
        return;
      }
      await Admin.create({
        name: env.ADMIN_SEED_NAME,
        email: seedEmail,
        password: seedPassword,
        role: 'Super Admin',
        isActive: true,
      });
      console.log(`\x1b[1m[Seed]\x1b[0m \x1b[32mDefault Super Admin seeded successfully (${seedEmail})\x1b[0m`);
    }
  } catch (error) {
    console.error(`\x1b[1m[Seed]\x1b[0m \x1b[31mAdmin user seeding failed: ${error.message}\x1b[0m`);
  }
};

await seedAdmin();

const PORT = env.PORT;

const server = app.listen(PORT, () => {
  console.log(`\x1b[1m[Server]\x1b[0m \x1b[32mOnline & accepting connections on port ${PORT}\x1b[0m\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`\x1b[1m[Error]\x1b[0m \x1b[31mUnhandled Rejection: ${err.message}\x1b[0m`);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`\x1b[1m[Error]\x1b[0m \x1b[31mUncaught Exception: ${err.message}\x1b[0m`);
  server.close(() => process.exit(1));
});
