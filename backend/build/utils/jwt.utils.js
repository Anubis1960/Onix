"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyToken = verifyToken;
const jwt = __importStar(require("jsonwebtoken"));
const secrets_utils_1 = require("./secrets.utils");
/**
 * @description This function generates a JWT access token.
 * @returns {string} The generated access token.
 */
function generateAccessToken() {
    return jwt.sign({}, secrets_utils_1.JWT_SECRET, {
        expiresIn: "1h", // Access token expires in 15 minutes
    });
}
/**
 * @description This function generates a JWT refresh token.
 * @returns {string} The generated refresh token.
 */
function generateRefreshToken() {
    return jwt.sign({}, secrets_utils_1.JWT_SECRET, {
        expiresIn: "21d", // Refresh token expires in 21 days
    });
}
/**
 * @description This function verifies a JWT token.
 * @param {string} token - The token to verify.
 * @returns {string | jwt.JwtPayload} The decoded token payload if valid, otherwise throws an error.
 */
function verifyToken(token) {
    return jwt.verify(token, secrets_utils_1.JWT_SECRET);
}
