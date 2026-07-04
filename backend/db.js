import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Standard dotenv for local development
dotenv.config({ path: path.join(__dirname, '.env') });

// BULLETPROOF HOSTINGER FIX: Manually read the file because Hostinger sometimes strips process.env
let dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'skfarmland',
};

try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        value = value.replace(/(^['"]|['"]$)/g, '').trim(); // Remove quotes
        // Only use .env value if process.env doesn't already have it (like from Hostinger Dashboard)
        if (key === 'DB_HOST' && !process.env.DB_HOST) dbConfig.host = (value === 'localhost') ? '127.0.0.1' : value;
        if (key === 'DB_USER' && !process.env.DB_USER) dbConfig.user = value;
        if (key === 'DB_PASSWORD' && !process.env.DB_PASSWORD) dbConfig.password = value;
        if (key === 'DB_NAME' && !process.env.DB_NAME) dbConfig.database = value;
      }
    });
  }
} catch (e) {
  console.log('Manual env parsing skipped');
}

// Force 127.0.0.1 instead of localhost for Hostinger Node 18+ IPv6 issues
if (dbConfig.host === 'localhost') {
  dbConfig.host = '127.0.0.1';
}

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection immediately to catch errors early
pool.getConnection()
  .then(connection => {
    console.log(`Successfully connected to Database: ${dbConfig.database}`);
    connection.release();
  })
  .catch(err => {
    console.error('\n========================================================');
    console.error('CRITICAL: DATABASE CONNECTION FAILED!');
    console.error('Check your .env credentials on Hostinger.');
    console.error(`Attempted connecting to User: ${dbConfig.user}, DB: ${dbConfig.database}`);
    console.error('Exact Error:', err.message);
    console.error('========================================================\n');
  });

export default pool;
