import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB (only once — Vercel reuses warm instances)
import connectDB from '../config/db.config.js';
await connectDB();

// Export the Express app — Vercel treats default export as the HTTP handler
import app from '../app.js';
export default app;
