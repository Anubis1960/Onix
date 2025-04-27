import dotenv from 'dotenv';

dotenv.config();

// Database configuration
export const DB_HOST = process.env.DB_HOST || '';
export const DB_PORT = Number(process.env.DB_PORT) || 5432;
export const DB_USERNAME = process.env.DB_USERNAME || '';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_NAME = process.env.DB_NAME || '';

// Supabase configuration
export const SUPABASE_URL = process.env.SUPABASE_URL || '';
export const SUPABASE_KEY = process.env.SUPABASE_KEY || '';

// JWT configuration
export const JWT_SECRET = process.env.JWT_SECRET || '';

// Google oauth configuration
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
export const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || '';

// Server configuration
export const SERVER_PORT = Number(process.env.SERVER_PORT) || 5000;