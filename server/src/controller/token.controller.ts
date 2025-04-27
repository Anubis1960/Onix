import {Request, Response} from "express";
import {generateAccessToken, generateRefreshToken, verifyToken} from "../utils/jwt.utils";

/**
 * @class TokenController
 * @description This class handles the generation and verification of JWT tokens.
 */
export class TokenController {
    async refreshTokens(req: Request, res: Response) {
        if (!req.cookies.refreshToken) {
            res.sendStatus(401);
        }
        const refreshToken = req.cookies.refreshToken;
        const decodedToken = verifyToken(refreshToken);
        if (!decodedToken) {
            res.sendStatus(403);
        }
        const accessToken = generateAccessToken();
        const newRefreshToken = generateRefreshToken();
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            accessToken,
        });
    }
}
