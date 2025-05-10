"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_PORT = exports.GOOGLE_CALLBACK_URL = exports.GOOGLE_CLIENT_SECRET = exports.GOOGLE_CLIENT_ID = exports.JWT_SECRET = exports.SUPABASE_KEY = exports.SUPABASE_URL = exports.DB_NAME = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Database configuration
exports.DB_HOST = process.env.DB_HOST || '';
exports.DB_PORT = Number(process.env.DB_PORT) || 5432;
exports.DB_USERNAME = process.env.DB_USERNAME || '';
exports.DB_PASSWORD = process.env.DB_PASSWORD || '';
exports.DB_NAME = process.env.DB_NAME || '';
// Supabase configuration
exports.SUPABASE_URL = process.env.SUPABASE_URL || '';
exports.SUPABASE_KEY = process.env.SUPABASE_KEY || '';
// JWT configuration
exports.JWT_SECRET = process.env.JWT_SECRET || '';
// Google oauth configuration
exports.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
exports.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
exports.GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || '';
// Server configuration
exports.SERVER_PORT = Number(process.env.SERVER_PORT) || 5000;
