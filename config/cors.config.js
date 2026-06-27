import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
  'http://localhost:5173', // Client portal / main web app dev port
  'http://localhost:5174', // Admin portal dev port
  'http://127.0.0.1:5173', // Local IP client portal dev port
  'http://127.0.0.1:5174', // Local IP admin portal dev port
  'https://admin.nextora.tech',
  'https://nextora.tech',
  'https://api.nextora.tech',
  'https://nextorastudio.tech',
  'https://www.nextorastudio.tech',
  'https://admin.nextorastudio.tech',
  // Vercel deployment URLs (update these with your real Vercel project names)
  'https://nextora-studio.vercel.app',
  'https://nextora-admin.vercel.app',
  'https://nextora-client.vercel.app',
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS policy'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default cors(corsOptions);
export { allowedOrigins };
