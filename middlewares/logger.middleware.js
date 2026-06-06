import fs from 'fs';

// Log to file config
const logDir = './logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

export const requestLogger = (req, res, next) => {
  const start = Date.now();
  const { method, originalUrl, ip } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    const logLine = `[${new Date().toISOString()}] ${method} ${originalUrl} ${statusCode} - ${duration}ms - IP: ${ip}\n`;
    
    // Console log
    console.log(logLine.trim());

    // Write log to file asynchronously
    fs.appendFile('./logs/access.log', logLine, (err) => {
      if (err) console.error('Failed to write request log:', err.message);
    });
  });

  next();
};
