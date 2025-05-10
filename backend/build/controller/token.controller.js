"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
/**
 * @class TokenController
 * @description This class handles the generation and verification of JWT tokens.
 */
class TokenController {
    refreshTokens(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.cookies.refreshToken) {
                res.sendStatus(401);
            }
            const refreshToken = req.cookies.refreshToken;
            const decodedToken = (0, jwt_utils_1.verifyToken)(refreshToken);
            if (!decodedToken) {
                res.sendStatus(403);
            }
            const accessToken = (0, jwt_utils_1.generateAccessToken)();
            const newRefreshToken = (0, jwt_utils_1.generateRefreshToken)();
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000
            });
            res.status(200).json({
                accessToken,
            });
        });
    }
}
exports.TokenController = TokenController;
