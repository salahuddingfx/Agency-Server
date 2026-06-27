import cors from 'cors';
import env from './env.config.js';

const allowedOrigins = [
  env.CLIENT_URL,
  env.ADMIN_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'https://admin.nextora.tech',
  'https://nextora.tech',
  'https://api.nextora.tech',
  'https://nextorastudio.tech',
  'https://www.nextorastudio.tech',
  'https://admin.nextorastudio.tech',
  'https://nextora-studio.vercel.app',
  'https://nextora-admin.vercel.app',
  'https://nextora-client.vercel.app',
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
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
