import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`database connected successfully...`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); 
  }
};