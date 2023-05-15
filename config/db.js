// Import required modules
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
let URI = dotenv.config().parsed.URI;

// Create a function to connect to the database
const connectDB = async () => {
  try {
    // Connect to MongoDB using the provided URI
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Connection successful
    console.log('Connected to MongoDB');
  } catch (error) {
    // Connection error
    console.error('Error connecting to MongoDB:', error);
  }
};

// Export the connectDB function
export default connectDB;
