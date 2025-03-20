const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Keep this for non-sensitive config

const app = express();
const PORT = process.env.PORT || 3001;

// Add more debugging
let claudeApiKey;
try {
  // Path to the API key file in the home directory
  const keyFilePath = path.join(process.env.HOME || process.env.USERPROFILE, '.api_keys', 'claude_keys.json');
  console.log('Looking for key file at:', keyFilePath);
  
  if (fs.existsSync(keyFilePath)) {
    console.log('File exists!');
    const keyData = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));
    console.log('File contents parsed successfully');
    
    if (keyData.CLAUDE_API_KEY) {
      console.log('API key found! First 5 chars:', keyData.CLAUDE_API_KEY.substring(0, 5) + '...');
      claudeApiKey = keyData.CLAUDE_API_KEY;
    } else {
      console.log('No CLAUDE_API_KEY property found in the file');
    }
  } else {
    console.log('File does not exist');
  }
} catch (error) {
  console.error('Error reading API key file:', error.message);
}

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Claude API proxy endpoint
app.post('/api/claude', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    console.log('Received prompt:', prompt);
    console.log('API Key present:', !!claudeApiKey);
    
    if (!claudeApiKey) {
      throw new Error('Claude API key is missing. Please check your key file.');
    }
    
    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 1000,
      messages: [
        { role: 'user', content: prompt }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01'
      }
    });
    
    console.log('Claude API response received');
    res.json(response.data);
  } catch (error) {
    console.error('Error calling Claude API:');
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    
    res.status(500).json({ 
      error: 'Failed to get response from Claude',
      details: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 