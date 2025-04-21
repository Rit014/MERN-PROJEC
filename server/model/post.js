import mongoose from 'mongoose';

// Define the post schema with only the picture field
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  categories: {
    type: String,
    required: true
  },
  picture: { type: String, required: false },  // Store image URL only
  createdDate: { type: Date, default: Date.now } // Store the date the image was uploaded
});

// Create a model based on the schema
const Post = mongoose.model('Post', postSchema);

export default Post;
