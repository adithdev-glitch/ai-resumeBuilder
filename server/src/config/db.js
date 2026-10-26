import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cvcraft';
  try {
    const conn = await mongoose.connect(uri);
    return conn;
  } catch (err) {
    // Graceful fallback for local development without local mongod
    console.warn(`[MongoDB] Notice: Could not connect to MongoDB at ${uri}. Cloud saves will be disabled until MongoDB is active. (${err.message})`);
    return null;
  }
}
