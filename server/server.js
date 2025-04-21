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

// Serve static files
const uploadPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadPath));

app.use('/', Router);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
Connection();
