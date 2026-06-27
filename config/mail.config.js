import nodemailer from 'nodemailer';
import env from './env.config.js';

const createMailTransporter = async () => {
  const isMock = env.SMTP_USER === 'mock-user@ethereal.email' || !env.SMTP_USER;
  
  if (isMock) {
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'melyna.runolfsson@ethereal.email',
        pass: '6yC24tH2gq2H75jBf8'
      }
    });
  }

  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: parseInt(env.SMTP_PORT, 10),
    secure: env.SMTP_PORT === '465',
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
};

export default createMailTransporter;
