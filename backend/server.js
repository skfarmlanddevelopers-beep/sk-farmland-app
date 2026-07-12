import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db.js';
import multer from 'multer';
import fs from 'fs';
import os from 'os';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(compression());
app.use(cors());
app.use(express.json());

// Serve uploaded static files
const uploadsDir = path.join(__dirname, 'user-uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Configure multer for file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Helper function to convert buffer to base64 data URL (legacy fallback)
const getBase64DataUrl = (file) => {
  if (!file) return null;
  const b64 = file.buffer.toString('base64');
  return `data:${file.mimetype};base64,${b64}`;
};

// Helper function to save buffer to disk and return relative URL
const saveUploadFile = async (file) => {
  if (!file) return null;
  try {
    const ext = path.extname(file.originalname) || '.jpg';
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${ext}`;
    const filePath = path.join(uploadsDir, filename);
    await fs.promises.writeFile(filePath, file.buffer);
    return `/uploads/${filename}`;
  } catch (err) {
    console.error('Failed to save uploaded file:', err);
    return null;
  }
};

// Helper to extract base64 and save to disk (auto migration)
const migrateBase64ToFile = async (base64Str) => {
  if (typeof base64Str !== 'string' || !base64Str.startsWith('data:image/')) {
    return base64Str; // Already a URL or not a base64 string
  }
  
  try {
    const match = base64Str.match(/^data:(image\/[a-zA-Z+-]+);base64,(.+)$/);
    if (!match) return base64Str;
    
    const mimeType = match[1];
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, 'base64');
    
    let ext = '.jpg';
    if (mimeType === 'image/png') ext = '.png';
    else if (mimeType === 'image/gif') ext = '.gif';
    else if (mimeType === 'image/svg+xml') ext = '.svg';
    else if (mimeType === 'image/webp') ext = '.webp';
    
    const filename = `migrated-${Date.now()}-${Math.random().toString(36).substring(2, 10)}${ext}`;
    const filePath = path.join(uploadsDir, filename);
    await fs.promises.writeFile(filePath, buffer);
    console.log(`Migrated base64 image to ${filename}`);
    return `/uploads/${filename}`;
  } catch (err) {
    console.error('Failed to migrate base64 image:', err);
    return base64Str;
  }
};




app.get('/api/gallery', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM gallery');
    rows.sort((a, b) => { if (a.display_order !== b.display_order) return (a.display_order || 0) - (b.display_order || 0); return new Date(b.created_at) - new Date(a.created_at); });
    res.json(rows);
  } catch (err) {
    console.error('Error fetching gallery:', err);
    res.status(500).json({ error: 'Failed to fetch gallery', details: err.message });
  }
});

// Leads Routes
app.get('/api/leads', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM leads ORDER BY created_at DESC');
    rows.sort((a, b) => { if (a.display_order !== b.display_order) return (a.display_order || 0) - (b.display_order || 0); return new Date(b.created_at) - new Date(a.created_at); });
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
      'INSERT INTO site_visits (name, phone, email, project_interest, budget, preferred_date, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
    rows.sort((a, b) => { if (a.display_order !== b.display_order) return (a.display_order || 0) - (b.display_order || 0); return new Date(b.created_at) - new Date(a.created_at); });
    res.json(rows);
  } catch (err) {
    console.error('Error fetching site visits:', err);
    res.status(500).json({ error: 'Failed to fetch site visits' });
  }
});

// Dashboard Stats Route
app.get('/api/stats', async (req, res) => {
  try {
    let projectsCount = 0, leadsCount = 0, galleryCount = 0, siteVisitsCount = 0;
    try { const [p] = await db.query('SELECT COUNT(*) as count FROM projects'); projectsCount = p[0].count; } catch (e) {}
    try { const [l] = await db.query('SELECT COUNT(*) as count FROM leads'); leadsCount = l[0].count; } catch (e) {}
    try { const [g] = await db.query('SELECT COUNT(*) as count FROM gallery'); galleryCount = g[0].count; } catch (e) {}
    try { const [s] = await db.query('SELECT COUNT(*) as count FROM site_visits'); siteVisitsCount = s[0].count; } catch (e) {}

    res.json({
      projects: projectsCount,
      leads: leadsCount,
      gallery: galleryCount,
      siteVisits: siteVisitsCount
    });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Failed to fetch stats', details: err.message });
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

app.post('/api/gallery', upload.array('images', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }
    const uploadedPaths = [];
    for (const file of req.files) {
      const url = await saveUploadFile(file);
      const id = Date.now().toString() + Math.random().toString(36).substring(7);
      const title = 'Custom Upload';
      const category = 'Custom';
      const description = '';
      
      await db.query('INSERT INTO gallery (id, title, category, image, description) VALUES (?, ?, ?, ?, ?)', [id, title, category, url, description]);
      if (url) uploadedPaths.push(url);
    }
    res.json({ success: true, image_paths: uploadedPaths });
  } catch (err) {
    console.error('Error uploading gallery image:', err);
    res.status(500).json({ error: 'Failed to upload gallery images', details: err.message });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
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
    const [rows] = await db.query('SELECT * FROM hero_images ORDER BY display_order ASC, created_at ASC');
    rows.sort((a, b) => { if (a.display_order !== b.display_order) return (a.display_order || 0) - (b.display_order || 0); return new Date(b.created_at) - new Date(a.created_at); });
    res.json(rows);
  } catch (err) {
    console.error('Error fetching hero images:', err);
    res.status(500).json({ error: 'Failed to fetch hero images' });
  }
});

app.post('/api/hero-images', upload.array('images', 20), async (req, res) => {
  try {
    const { side } = req.body;
    if (!side || !['left', 'right'].includes(side)) {
      return res.status(400).json({ error: 'Invalid side parameter' });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }
    const uploadedPaths = [];
    for (const file of req.files) {
      const url = await saveUploadFile(file);
      await db.query('INSERT INTO hero_images (side, image_path) VALUES (?, ?)', [side, url]);
      if (url) uploadedPaths.push(url);
    }
    res.json({ success: true, image_paths: uploadedPaths });
  } catch (err) {
    console.error('Error uploading hero image:', err);
    res.status(500).json({ error: 'Failed to upload hero images' });
  }
});

app.delete('/api/hero-images/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM hero_images WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting hero image:', err);
    res.status(500).json({ error: 'Failed to delete hero image' });
  }
});

app.put('/api/hero-images/order', async (req, res) => {
  try {
    const { updates } = req.body;
    if (Array.isArray(updates)) {
      for (const item of updates) {
        await db.query('UPDATE hero_images SET display_order = ? WHERE id = ?', [item.display_order, item.id]);
      }
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating hero image order:', err);
    res.status(500).json({ error: 'Failed to update order' });
  }
});


// Admin Authentication Routes
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [rows] = await db.query('SELECT * FROM admin_settings WHERE username = ?', [username]);
    if (rows.length > 0) {
      const admin = rows[0];
      if (admin.password === password) {
        return res.json({ success: true, username: admin.username });
      }
    }
    res.status(401).json({ error: 'Invalid username or password' });
  } catch (err) {
    console.error('Error during admin login:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.get('/api/admin/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, username FROM admin_settings ORDER BY id ASC');
    rows.sort((a, b) => { if (a.display_order !== b.display_order) return (a.display_order || 0) - (b.display_order || 0); return new Date(b.created_at) - new Date(a.created_at); });
    res.json(rows);
  } catch (err) {
    console.error('Error fetching admins:', err);
    res.status(500).json({ error: 'Failed to fetch admins: ' + err.message });
  }
});

app.post('/api/admin/users', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    await db.query('INSERT INTO admin_settings (username, password) VALUES (?, ?)', [username, password]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error adding admin:', err);
    res.status(500).json({ error: 'Failed to add admin' });
  }
});

app.put('/api/admin/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    await db.query('UPDATE admin_settings SET username = ?, password = ? WHERE id = ?', [username, password, id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating admin credentials:', err);
    res.status(500).json({ error: 'Failed to update credentials' });
  }
});

app.delete('/api/admin/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // Check if it's the last admin
    const [rows] = await db.query('SELECT COUNT(*) as count FROM admin_settings');
    if (rows[0].count <= 1) {
      return res.status(400).json({ error: 'Cannot delete the last admin account.' });
    }
    
    await db.query('DELETE FROM admin_settings WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting admin:', err);
    res.status(500).json({ error: 'Failed to delete admin' });
  }
});

// Create tables on startup if they don't exist
async function initDb() {
  try {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS projects (
          id VARCHAR(100) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          price VARCHAR(100),
          bank_loan VARCHAR(100),
          images LONGTEXT,
          highlights LONGTEXT,
          show_on_home BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch (e) { console.error('Failed creating projects:', e.message); }

    try { await db.query(`ALTER TABLE projects ADD COLUMN show_on_home BOOLEAN DEFAULT FALSE`); } catch (err) {}
    try { await db.query(`ALTER TABLE projects ADD COLUMN display_order INT DEFAULT 0`); } catch (err) {}
    try { await db.query(`ALTER TABLE projects ADD COLUMN heading VARCHAR(100) AFTER id`); } catch (err) {}
    try { await db.query(`ALTER TABLE projects ADD COLUMN sub_heading VARCHAR(255) AFTER name`); } catch (err) {}
    try { await db.query(`ALTER TABLE hero_images ADD COLUMN display_order INT DEFAULT 0`); } catch (err) {}

    // Ensure all image columns are LONGTEXT to prevent truncation of Base64 strings
    try { await db.query(`ALTER TABLE projects MODIFY COLUMN images LONGTEXT`); } catch (err) {}
    try { await db.query(`ALTER TABLE gallery MODIFY COLUMN image LONGTEXT`); } catch (err) {}
    try { await db.query(`ALTER TABLE hero_images MODIFY COLUMN image_path LONGTEXT`); } catch (err) {}

    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS gallery (
          id VARCHAR(100) PRIMARY KEY,
          title VARCHAR(255),
          category VARCHAR(100),
          image TEXT,
          description TEXT
        )
      `);
    } catch (e) { console.error('Failed creating gallery:', e.message); }

    try {
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
    } catch (e) { console.error('Failed creating leads:', e.message); }

    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS hero_images (
          id INT AUTO_INCREMENT PRIMARY KEY,
          side ENUM('left', 'right') NOT NULL,
          image_path LONGTEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch (e) { console.error('Failed creating hero_images:', e.message); }

    try {
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
    } catch (e) { console.error('Failed creating site_visits:', e.message); }
    
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS admin_settings (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL
        )
      `);
    } catch (e) { console.error('Failed creating admin_settings:', e.message); }

    try {
      const [adminRows] = await db.query('SELECT * FROM admin_settings LIMIT 1');
      if (adminRows.length === 0) {
        await db.query('INSERT INTO admin_settings (username, password) VALUES (?, ?)', ['admin', 'password123']);
      }
    } catch (e) { console.error('Failed inserting admin:', e.message); }

    // Auto-migration: Migrate legacy base64 images to file-based uploads
    try {
      console.log('Checking for base64 image migration...');
      
      // Migrate Projects images
      try {
        const [projects] = await db.query('SELECT id, images FROM projects');
        for (const project of projects) {
          let images = [];
          try {
            images = typeof project.images === 'string' ? JSON.parse(project.images) : project.images;
          } catch (e) {
            continue;
          }
          
          if (Array.isArray(images)) {
            let updated = false;
            const newImages = [];
            for (const img of images) {
              if (typeof img === 'string' && img.startsWith('data:image/')) {
                const url = await migrateBase64ToFile(img);
                newImages.push(url);
                updated = true;
              } else {
                newImages.push(img);
              }
            }
            if (updated) {
              await db.query('UPDATE projects SET images = ? WHERE id = ?', [JSON.stringify(newImages), project.id]);
            }
          }
        }
      } catch (err) {
        console.error('Projects image migration failed:', err);
      }

      // Migrate Gallery images
      try {
        const [galleryItems] = await db.query('SELECT id, image FROM gallery');
        for (const item of galleryItems) {
          if (typeof item.image === 'string' && item.image.startsWith('data:image/')) {
            const url = await migrateBase64ToFile(item.image);
            await db.query('UPDATE gallery SET image = ? WHERE id = ?', [url, item.id]);
          }
        }
      } catch (err) {
        console.error('Gallery image migration failed:', err);
      }

      // Migrate Hero images
      try {
        const [heroImages] = await db.query('SELECT id, image_path FROM hero_images');
        for (const img of heroImages) {
          if (typeof img.image_path === 'string' && img.image_path.startsWith('data:image/')) {
            const url = await migrateBase64ToFile(img.image_path);
            await db.query('UPDATE hero_images SET image_path = ? WHERE id = ?', [url, img.id]);
          }
        }
      } catch (err) {
        console.error('Hero images migration failed:', err);
      }
      
      console.log('Base64 image check/migration completed.');
    } catch (err) {
      console.error('General migration error:', err);
    }

    console.log('Database tables verified.');
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
}
// Run initDb immediately just in case app.listen callback is skipped by Phusion Passenger
initDb();

// Projects Routes
app.get('/api/projects', async (req, res) => {
  try {
    const { all } = req.query;
    let query = 'SELECT * FROM projects WHERE show_on_home = 1 ';
    let params = [];
    
    // If admin panel requests all projects
    if (all === 'true') {
      query = 'SELECT * FROM projects ';
    }
    
    const [rows] = await db.query(query, params);
    rows.sort((a, b) => { if (a.display_order !== b.display_order) return (a.display_order || 0) - (b.display_order || 0); return new Date(b.created_at) - new Date(a.created_at); });
    res.json(rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', upload.array('images', 15), async (req, res) => {
  try {
    const { heading, name, sub_heading, price, bank_loan, highlights, show_on_home } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }
    
    // Process uploaded images and save to disk
    const imagePaths = [];
    if (req.files) {
      for (const file of req.files) {
        const url = await saveUploadFile(file);
        if (url) imagePaths.push(url);
      }
    }
    
    // Parse highlights
    let parsedHighlights = [];
    try {
      parsedHighlights = highlights ? JSON.parse(highlights) : [];
    } catch (e) {
      parsedHighlights = [];
    }

    const id = Date.now().toString();
    const isShowOnHome = show_on_home === 'true' || show_on_home === true;
    
    await db.query(
      'INSERT INTO projects (id, heading, name, sub_heading, price, bank_loan, images, highlights, show_on_home) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, heading || '', name, sub_heading || '', price || '', bank_loan || '', JSON.stringify(imagePaths), JSON.stringify(parsedHighlights), isShowOnHome]
    );
    res.json({ id, name, price, bank_loan, images: imagePaths, highlights: parsedHighlights, show_on_home: isShowOnHome });
  } catch (err) {
    console.error('Error saving project:', err);
    res.status(500).json({ error: 'Failed to save project' });
  }
});

app.put('/api/projects/order', async (req, res) => {
  try {
    const { updates } = req.body;
    if (Array.isArray(updates)) {
      for (const item of updates) {
        await db.query('UPDATE projects SET display_order = ? WHERE id = ?', [item.display_order, item.id]);
      }
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating project order:', err);
    res.status(500).json({ error: 'Failed to update order' });
  }
});
app.put('/api/projects/:id', upload.array('images', 15), async (req, res) => {
  try {
    const { id } = req.params;
    const { heading, name, sub_heading, price, bank_loan, highlights, show_on_home } = req.body;
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

    const isShowOnHome = show_on_home === 'true' || show_on_home === true;

    if (req.files && req.files.length > 0) {
      // New images uploaded
      const imagePaths = [];
      for (const file of req.files) {
        const url = await saveUploadFile(file);
        if (url) imagePaths.push(url);
      }
      await db.query(
        'UPDATE projects SET heading = ?, name = ?, sub_heading = ?, price = ?, bank_loan = ?, images = ?, highlights = ?, show_on_home = ? WHERE id = ?',
        [heading || '', name, sub_heading || '', price || '', bank_loan || '', JSON.stringify(imagePaths), JSON.stringify(parsedHighlights), isShowOnHome, id]
      );
    } else {
      await db.query(
        'UPDATE projects SET heading = ?, name = ?, sub_heading = ?, price = ?, bank_loan = ?, highlights = ?, show_on_home = ? WHERE id = ?',
        [heading || '', name, sub_heading || '', price || '', bank_loan || '', JSON.stringify(parsedHighlights), isShowOnHome, id]
      );
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating project:', err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id/image', async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    const [rows] = await db.query('SELECT images FROM projects WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    let images = typeof rows[0].images === 'string' ? JSON.parse(rows[0].images) : rows[0].images;
    if (!Array.isArray(images)) images = [];

    const updatedImages = images.filter(img => img !== imageUrl);

    await db.query('UPDATE projects SET images = ? WHERE id = ?', [JSON.stringify(updatedImages), id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting project image:', err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT images FROM projects WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    await db.query('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error deleting project:', err);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
