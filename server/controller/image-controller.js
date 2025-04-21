import Post from '../model/imageSchema.js';
import { cloudinary } from '../cloudinary.js';

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'mern_uploads',  // Optional: specify folder in Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'],  // Optional: restrict allowed formats
    });

    console.log('📷 Uploaded to Cloudinary:', result);

    // Store the Cloudinary image URL in the database
    const newPost = new Post({
      picture: result.secure_url,  // Cloudinary image URL
    });

    await newPost.save();

    return res.status(200).json({ msg: 'Image uploaded and stored successfully', newPost });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Upload failed", error: error.message });
  }
};
