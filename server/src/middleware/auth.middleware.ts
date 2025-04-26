import {NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
}
