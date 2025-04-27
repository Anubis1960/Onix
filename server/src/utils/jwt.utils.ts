import * as jwt from "jsonwebtoken";
import {JWT_SECRET} from "./secrets.utils";

export function generateAccessToken(): string {
    return jwt.sign({}, JWT_SECRET, {
        expiresIn: "1h", // Access token expires in 15 minutes
    });
}

export function generateRefreshToken(): string {
    return jwt.sign({}, JWT_SECRET, {
        expiresIn: "21d", // Refresh token expires in 21 days
    });
}

export function verifyToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, JWT_SECRET);
}