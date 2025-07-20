import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/halohunt',
  JWT_SECRET: process.env.JWT_SECRET || 'halohunt_secret_key',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  NODE_ENV: process.env.NODE_ENV || 'development'
}; 