import multer from 'multer';
import { storage } from '../cloudinary.js';
// ✅ Export multer instance using Cloudinary storage
const upload = multer({ storage });
export default upload;
