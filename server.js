const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'visiontech_epc_secret_key_2026';
const DATA_FILE = path.join(__dirname, 'data', 'siteData.json');

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve frontend static files
app.use(express.static(__dirname));

// Multer Storage for Media Uploads (Images, Videos, Documents)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, 'assets', 'uploads');
    if (file.mimetype.startsWith('video/')) {
      uploadPath = path.join(__dirname, 'assets', 'videos');
    } else if (file.mimetype.startsWith('image/')) {
      uploadPath = path.join(__dirname, 'assets', 'images');
    }
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + cleanName);
  }
});
const upload = multer({ storage });

// Admin credentials helper
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
// default password: admin@visiontech
const ADMIN_HASH = bcrypt.hashSync(process.env.ADMIN_PASS || 'admin@visiontech', 10);

// Auth Middleware
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized: No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Forbidden: Invalid or expired token' });
  }
}

// ----------------- API ROUTES ----------------- //

// 1. Admin Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && bcrypt.compareSync(password, ADMIN_HASH)) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ success: true, token, username });
  }
  return res.status(401).json({ success: false, error: 'Invalid username or password' });
});

// 2. Get All Site Data (Public & Admin)
app.get('/api/content', (req, res) => {
  try {
    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(rawData);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read content data' });
  }
});

// 3. Update Site Data (Protected)
app.post('/api/content', requireAuth, (req, res) => {
  try {
    const newContent = req.body;
    fs.writeFileSync(DATA_FILE, JSON.stringify(newContent, null, 2), 'utf8');
    res.json({ success: true, message: 'Content updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save content data' });
  }
});

// 4. File / Media Upload (Protected)
app.post('/api/upload', requireAuth, upload.single('mediaFile'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  // Return relative path for web use
  const relPath = path.relative(__dirname, req.file.path).replace(/\\/g, '/');
  res.json({ success: true, filePath: relPath, filename: req.file.filename });
});

// 5. RFQ Quote / Contact Inquiries Store
const INQUIRIES_FILE = path.join(__dirname, 'data', 'inquiries.json');
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, '[]', 'utf8');
}

app.post('/api/inquiries', (req, res) => {
  try {
    const list = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf8'));
    const newInquiry = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...req.body
    };
    list.unshift(newInquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), 'utf8');
    res.json({ success: true, message: 'Inquiry received' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record inquiry' });
  }
});

app.get('/api/inquiries', requireAuth, (req, res) => {
  try {
    const list = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf8'));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load inquiries' });
  }
});

// Serve Admin Panel UI
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`⚡ VisionTech EPC Management Server Online!`);
  console.log(`🌐 Website URL:     http://localhost:${PORT}`);
  console.log(`🔐 Admin Panel:     http://localhost:${PORT}/admin`);
  console.log(`🔑 Default Admin:   admin`);
  console.log(`🔑 Default Pass:    admin@visiontech`);
  console.log(`====================================================`);
});
