import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import Router from './routes/routes.js';
import Connection from './database/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// 🛠 Fix for __dirname on Windows
const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([a-zA-Z]):/, '$1:');

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React build directory
  app.use(express.static(path.join(__dirname, 'Blog', 'build')));

  // For any route that doesn't match an API route, serve the React index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Blog', 'build', 'index.html'));
  });
}

// Serve static files for uploads
const uploadPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadPath));

// Use the router for API routes
app.use('/', Router);

// Connect to the database
Connection();

// Start the server
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
