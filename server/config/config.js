import dotenv from 'dotenv';

// Load env vars
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/halohunt';
export const JWT_SECRET = process.env.JWT_SECRET || 'halohunt_secret_key_dev';
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '30d';
export const JWT_COOKIE_EXPIRE = process.env.JWT_COOKIE_EXPIRE || 30;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID; 