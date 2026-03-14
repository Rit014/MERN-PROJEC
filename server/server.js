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

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://blogpage-xsj0.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const __dirname = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([a-zA-Z]):/, '$1:');

const uploadPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadPath));

app.use('/', Router);

Connection();

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
