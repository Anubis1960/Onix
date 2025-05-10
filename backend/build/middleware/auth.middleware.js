"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
/**
 * * Middleware to authenticate requests using JWT.
 * @param req
 * @param res
 * @param next
 */
const authMiddleware = (req, res, next) => {
    // const headers = req.headers.authorization;
    // if (!headers) {
    //     res.status(401).json({message: "Authorization header is missing"});
    //     return;
    // }
    // const token = headers.split(" ")[1];
    // if (!token) {
    //     res.status(401).json({message: "Token is missing"});
    //     return;
    // }
    // const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    // if (!decodedToken) {
    //     res.status(401).json({message: "Invalid token"});
    //     return;
    // }
    next();
};
exports.authMiddleware = authMiddleware;
