import app from './app.js';
import connectDB from './config/db.config.js';
import Admin from './models/admin.model.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
connectDB();

// Seed initial administrative user if empty
const seedAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({
        name: 'System Super Admin',
        email: 'superadmin@nextora.tech',
        password: 'Admin@Nextora2026',
        role: 'Super Admin',
        isActive: true,
      });
      console.log('--- SEED COMPLETE: Default Super Admin User Seeded (superadmin@nextora.tech / Admin@Nextora2026) ---');
    }
  } catch (error) {
    console.error(`Admin user seeding failed: ${error.message}`);
  }
};

seedAdmin();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Nextora Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception Error: ${err.message}`);
  server.close(() => process.exit(1));
});
