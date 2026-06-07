import app from './app.js';
import connectDB from './config/db.config.js';
import Admin from './models/admin.model.js';
import dotenv from 'dotenv';
import { printBanner } from './helpers/banner.helper.js';

dotenv.config();

// Print beautiful custom console banner
await printBanner();

// Connect to MongoDB
connectDB();

// Seed initial administrative user if empty
const seedAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({
        name: 'Salah Uddin Kader',
        email: 'info.salahuddinkader@gmail.com',
        password: 'Salah5537@@',
        role: 'Super Admin',
        isActive: true,
      });
      console.log(`\x1b[1m[Seed]\x1b[0m \x1b[32mDefault Super Admin seeded successfully (info.salahuddinkader@gmail.com)\x1b[0m`);
    }
  } catch (error) {
    console.error(`\x1b[1m[Seed]\x1b[0m \x1b[31mAdmin user seeding failed: ${error.message}\x1b[0m`);
  }
};

seedAdmin();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`\x1b[1m[Server]\x1b[0m \x1b[32mOnline & accepting connections on port ${PORT}\x1b[0m\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`\x1b[1m[Error]\x1b[0m \x1b[31mUnhandled Rejection: ${err.message}\x1b[0m`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`\x1b[1m[Error]\x1b[0m \x1b[31mUncaught Exception: ${err.message}\x1b[0m`);
  server.close(() => process.exit(1));
});
