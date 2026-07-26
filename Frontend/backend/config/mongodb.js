import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB Connected successfully to EcoLens database!');
    });
    
    let uri = process.env.MONGODB_URI || "mongodb+srv://anannayareallycodes_db_user:Ay6uXKiHagRATGNa@cluster0.xbdmhvd.mongodb.net/ecolense";
    
    await mongoose.connect(uri);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
};

export default connectDB;
