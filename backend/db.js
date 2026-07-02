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
  host: process.env.DB_HOST || 'localhost',
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
        if (key === 'DB_HOST') dbConfig.host = value;
        if (key === 'DB_USER') dbConfig.user = value;
        if (key === 'DB_PASSWORD') dbConfig.password = value;
        if (key === 'DB_NAME') dbConfig.database = value;
      }
    });
  }
} catch (e) {
  console.log('Manual env parsing skipped');
}

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
