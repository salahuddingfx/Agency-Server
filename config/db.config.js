import mongoose from 'mongoose';
import dns from 'dns';
import env from './env.config.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

const connectDB = async () => {
  try {
    console.log(`${colors.bright}[Database]${colors.reset} ${colors.cyan}Establishing connection to MongoDB...${colors.reset}`);
    
    await mongoose.connect(env.MONGO_URI, {
      autoIndex: true,
    });
    
    if (process.stdout.isTTY) {
      process.stdout.write('\x1b[1A\x1b[2K');
    }
    console.log(`${colors.bright}[Database]${colors.reset} ${colors.green}Database connected successfully (Synced)${colors.reset}`);
  } catch (error) {
    console.error(`\n${colors.bright}[Database]${colors.reset} ${colors.red}Connection failed: ${error.message}${colors.reset}`);
    process.exit(1);
  }
};

export default connectDB;
