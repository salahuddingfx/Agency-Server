import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const createMailTransporter = async () => {
  // Check if credentials are local defaults and optionally create an Ethereal test account if needed,
  // or use the SMTP credentials from .env.
  const isMock = process.env.SMTP_USER === 'mock-user@ethereal.email' || !process.env.SMTP_USER;
  
  if (isMock) {
    // Return a transport that logs to console or falls back to Ethereal
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'melyna.runolfsson@ethereal.email', // pre-configured ethereal credentials for instant work
        pass: '6yC24tH2gq2H75jBf8'
      }
    });
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export default createMailTransporter;
