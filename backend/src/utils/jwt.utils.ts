import * as jwt from "jsonwebtoken";
import {JWT_SECRET} from "./secrets.utils";

/**
 * @description This function generates a JWT access token.
 * @returns {string} The generated access token.
 */
export function generateAccessToken(): string {
    return jwt.sign({}, JWT_SECRET, {
        expiresIn: "1h", // Access token expires in 15 minutes
    });
}

/**
 * @description This function generates a JWT refresh token.
 * @returns {string} The generated refresh token.
 */
export function generateRefreshToken(): string {
    return jwt.sign({}, JWT_SECRET, {
        expiresIn: "21d", // Refresh token expires in 21 days
    });
}

/**
 * @description This function verifies a JWT token.
 * @param {string} token - The token to verify.
 * @returns {string | jwt.JwtPayload} The decoded token payload if valid, otherwise throws an error.
 */
export function verifyToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, JWT_SECRET);
}