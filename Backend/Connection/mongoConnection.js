import mongoose from 'mongoose';

const connection = async () => {
  try {
    if (!process.env.DB_URL || !process.env.DB_NAME) {
      throw new Error('Database environment variables are missing');
    }
    const URL = `${process.env.DB_URL}${process.env.DB_NAME}`;

    const conn = await mongoose.connect(URL);

    console.log(` MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(' MongoDB connection failed:', error.message);
    process.exit(1); 
  }
};

export default connection;
