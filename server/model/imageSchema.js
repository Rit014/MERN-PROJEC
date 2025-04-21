import mongoose from 'mongoose';

// Define the post schema with only the picture field
const postSchema = new mongoose.Schema({
  picture: { type: String, required: true },  // Store image URL only
  createdDate: { type: Date, default: Date.now } // Store the date the image was uploaded
});

// Create a model based on the schema
const Image = mongoose.model('Image', postSchema);

export default Image;
