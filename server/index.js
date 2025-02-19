const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Ensure directories exist
const ensureDirectoriesExist = async () => {
  const categories = ['kids', 'tutorials', 'blog'];
  const baseDir = path.join(__dirname, '..', 'public', 'md');
  
  try {
    await fs.mkdir(baseDir, { recursive: true });
    
    for (const category of categories) {
      const categoryPath = path.join(baseDir, category);
      await fs.mkdir(categoryPath, { recursive: true });
    }
  } catch (error) {
    console.error('Error creating directories:', error);
  }
};

// Create directories when server starts
ensureDirectoriesExist();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    try {
      const { category } = req.body;
      const dir = path.join(__dirname, '..', 'public', 'md', category);
      await fs.mkdir(dir, { recursive: true }); // Ensure directory exists
      cb(null, dir);
    } catch (error) {
      cb(error);
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Serve static files from public directory
app.use('/md', express.static(path.join(__dirname, '..', 'public', 'md')));

// Get folder structure
app.get('/api/folders', async (req, res) => {
  try {
    const baseDir = path.join(__dirname, '..', 'public', 'md');
    const categories = ['kids', 'tutorials', 'blog'];
    
    const structure = {};
    
    for (const category of categories) {
      try {
        const categoryPath = path.join(baseDir, category);
        await fs.mkdir(categoryPath, { recursive: true }); // Ensure directory exists
        const files = await fs.readdir(categoryPath);
        
        structure[category] = files
          .filter(file => file.endsWith('.md'))
          .map(file => ({
            name: file,
            path: `/md/${category}/${file}`
          }));
      } catch (err) {
        console.error(`Error reading category ${category}:`, err);
        structure[category] = [];
      }
    }
    
    res.json(structure);
  } catch (error) {
    console.error('Error reading folders:', error);
    res.status(500).json({ error: 'Failed to read folders' });
  }
});

// Handle file upload
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { category } = req.body;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!category) {
      return res.status(400).json({ error: 'Category is required' });
    }

    // Verify the file was saved
    const filePath = path.join(__dirname, '..', 'public', 'md', category, file.originalname);
    await fs.access(filePath);

    res.json({ 
      success: true, 
      path: `/md/${category}/${file.originalname}`,
      name: file.originalname
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file: ' + error.message });
  }
});

// Debug endpoint
app.get('/api/debug', async (req, res) => {
  const baseDir = path.join(__dirname, '..', 'public', 'md');
  try {
    const debug = {
      baseDir,
      exists: await fs.access(baseDir).then(() => true).catch(() => false),
      structure: {}
    };

    const categories = ['kids', 'tutorials', 'blog'];
    for (const category of categories) {
      const categoryPath = path.join(baseDir, category);
      debug.structure[category] = {
        path: categoryPath,
        exists: await fs.access(categoryPath).then(() => true).catch(() => false)
      };

      if (debug.structure[category].exists) {
        debug.structure[category].files = await fs.readdir(categoryPath);
      }
    }

    res.json(debug);
  } catch (error) {
    res.status(500).json({ error: error.message, stack: error.stack });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MD files directory: ${path.join(__dirname, '..', 'public', 'md')}`);
});