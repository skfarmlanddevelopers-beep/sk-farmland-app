import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './backend/db.js';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'backend', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'backend', 'uploads')));

// API Routes
app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM projects');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.get('/api/gallery', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM gallery');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching gallery:', err);
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

// Leads Routes
app.get('/api/leads', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM leads ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching leads:', err);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// Site Visits Routes
app.post('/api/site-visits', async (req, res) => {
  try {
    const { name, phone, email, project_interest, budget, preferredDate, notes } = req.body;
    
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and Phone are required' });
    }

    await db.query(
      'INSERT INTO site_visits (name, phone, email, project_interest, budget, preferred_date, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, phone, email || '', project_interest || '', budget || '', preferredDate || '', notes || '']
    );
    
    res.json({ success: true });
  } catch (err) {
    console.error('Error saving site visit:', err);
    res.status(500).json({ error: 'Failed to save site visit' });
  }
});

app.get('/api/site-visits', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM site_visits ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching site visits:', err);
    res.status(500).json({ error: 'Failed to fetch site visits' });
  }
});

// Dashboard Stats Route
app.get('/api/stats', async (req, res) => {
  try {
    const [projects] = await db.query('SELECT COUNT(*) as count FROM projects');
    const [leads] = await db.query('SELECT COUNT(*) as count FROM leads');
    const [gallery] = await db.query('SELECT COUNT(*) as count FROM gallery');
    const [siteVisits] = await db.query('SELECT COUNT(*) as count FROM site_visits');

    res.json({
      projects: projects[0].count,
      leads: leads[0].count,
      gallery: gallery[0].count,
      siteVisits: siteVisits[0].count
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.post('/api/leads', async (req, res) => {
  try {
    const { name, phone, email, interest, budget, notes } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }
    await db.query(
      'INSERT INTO leads (name, phone, email, interest, budget, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [name, phone, email || '', interest || '', budget || '', notes || '']
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Error saving lead:', err);
    res.status(500).json({ error: 'Failed to save lead' });
  }
});

app.post('/api/gallery', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const imagePath = `/uploads/${req.file.filename}`;
    const id = Date.now().toString();
    const title = 'Custom Upload';
    const category = 'Custom';
    const description = '';
    
    await db.query('INSERT INTO gallery (id, title, category, image, description) VALUES (?, ?, ?, ?, ?)', [id, title, category, imagePath, description]);
    res.json({ success: true, image_path: imagePath });
  } catch (err) {
    console.error('Error uploading gallery image:', err);
    res.status(500).json({ error: 'Failed to upload gallery image' });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT image FROM gallery WHERE id = ?', [id]);
    if (rows.length > 0) {
      const imagePath = rows[0].image;
      if (imagePath && imagePath.startsWith('/uploads/')) {
        const filename = imagePath.split('/').pop();
        const fullPath = path.join(__dirname, 'backend', 'uploads', filename);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
    }
    await db.query('DELETE FROM gallery WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting gallery image:', err);
    res.status(500).json({ error: 'Failed to delete gallery image' });
  }
});

// Hero Images Routes
app.get('/api/hero-images', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM hero_images ORDER BY created_at ASC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching hero images:', err);
    res.status(500).json({ error: 'Failed to fetch hero images' });
  }
});

app.post('/api/hero-images', upload.single('image'), async (req, res) => {
  try {
    const { side } = req.body;
    if (!side || !['left', 'right'].includes(side)) {
      return res.status(400).json({ error: 'Invalid side parameter' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }
    const imagePath = `/uploads/${req.file.filename}`;
    await db.query('INSERT INTO hero_images (side, image_path) VALUES (?, ?)', [side, imagePath]);
    res.json({ success: true, image_path: imagePath });
  } catch (err) {
    console.error('Error uploading hero image:', err);
    res.status(500).json({ error: 'Failed to upload hero image' });
  }
});

app.delete('/api/hero-images/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT image_path FROM hero_images WHERE id = ?', [id]);
    if (rows.length > 0) {
      const imagePath = rows[0].image_path;
      // imagePath is like "/uploads/123.jpg", we need to map to physical file
      const filename = imagePath.split('/').pop();
      const fullPath = path.join(__dirname, 'backend', 'uploads', filename);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
    await db.query('DELETE FROM hero_images WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting hero image:', err);
    res.status(500).json({ error: 'Failed to delete hero image' });
  }
});

// Serve static React files in production
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback for React Router (if using one in the future) or state-based single page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Create tables on startup if they don't exist
async function initDb() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price VARCHAR(100),
        bank_loan VARCHAR(100),
        images JSON,
        highlights JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS gallery (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255),
        category VARCHAR(100),
        image TEXT,
        description TEXT
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        interest VARCHAR(255),
        budget VARCHAR(100),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS hero_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        side ENUM('left', 'right') NOT NULL,
        image_path VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS site_visits (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255),
        project_interest VARCHAR(255),
        budget VARCHAR(100),
        preferred_date VARCHAR(100),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Database tables verified.');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}

// Projects Routes
app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', upload.array('images', 15), async (req, res) => {
  try {
    const { name, price, bank_loan, highlights } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }
    
    // Process uploaded images
    const imagePaths = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];
    
    // Parse highlights
    let parsedHighlights = [];
    try {
      parsedHighlights = highlights ? JSON.parse(highlights) : [];
    } catch (e) {
      parsedHighlights = [];
    }

    const id = Date.now().toString();
    await db.query(
      'INSERT INTO projects (id, name, price, bank_loan, images, highlights) VALUES (?, ?, ?, ?, ?, ?)',
      [id, name, price || '', bank_loan || 'Not Available', JSON.stringify(imagePaths), JSON.stringify(parsedHighlights)]
    );
    res.json({ id, name, price, bank_loan, images: imagePaths, highlights: parsedHighlights });
  } catch (err) {
    console.error('Error saving project:', err);
    res.status(500).json({ error: 'Failed to save project' });
  }
});

app.put('/api/projects/:id', upload.array('images', 15), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, bank_loan, highlights } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }
    
    // Parse highlights
    let parsedHighlights = [];
    try {
      parsedHighlights = highlights ? JSON.parse(highlights) : [];
    } catch (e) {
      parsedHighlights = [];
    }

    if (req.files && req.files.length > 0) {
      // New images uploaded, delete old ones
      const [rows] = await db.query('SELECT images FROM projects WHERE id = ?', [id]);
      if (rows.length > 0) {
        const oldImages = typeof rows[0].images === 'string' ? JSON.parse(rows[0].images) : rows[0].images;
        oldImages.forEach(img => {
          const filename = img.split('/').pop();
          const fullPath = path.join(__dirname, 'backend', 'uploads', filename);
          if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        });
      }

      const imagePaths = req.files.map(f => `/uploads/${f.filename}`);
      await db.query(
        'UPDATE projects SET name = ?, price = ?, bank_loan = ?, images = ?, highlights = ? WHERE id = ?',
        [name, price || '', bank_loan || 'Not Available', JSON.stringify(imagePaths), JSON.stringify(parsedHighlights), id]
      );
      res.json({ success: true, updatedWithImages: true });
    } else {
      // No new images, just update text
      await db.query(
        'UPDATE projects SET name = ?, price = ?, bank_loan = ?, highlights = ? WHERE id = ?',
        [name, price || '', bank_loan || 'Not Available', JSON.stringify(parsedHighlights), id]
      );
      res.json({ success: true, updatedWithImages: false });
    }
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT images FROM projects WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Delete files
    const images = typeof rows[0].images === 'string' ? JSON.parse(rows[0].images) : rows[0].images;
    if (Array.isArray(images)) {
      images.forEach(imgPath => {
        const filePath = path.join(__dirname, imgPath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }
    
    await db.query('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await initDb();
});
