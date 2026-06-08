import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';

// Configure Node.js to use public DNS resolvers (Google & Cloudflare)
// to bypass potential local/ISP restrictions on resolving MongoDB SRV records.
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

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
    
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/nextora', {
      autoIndex: true,
    });
    
    // Check if process stdout allows cursor moves and clear the connecting line
    if (process.stdout.isTTY) {
      process.stdout.write('\x1b[1A\x1b[2K'); // cursor up 1 line, clear line
    }
    console.log(`${colors.bright}[Database]${colors.reset} ${colors.green}Database connected successfully (Synced)${colors.reset}`);
  } catch (error) {
    console.error(`\n${colors.bright}[Database]${colors.reset} ${colors.red}Connection failed: ${error.message}${colors.reset}`);
    process.exit(1);
  }
};

export default connectDB;
