import {Request, Response, NextFunction} from "express";
import logger from "../config/logger.config";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    logger.error(err.stack);
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).json({
        error: {
            message: "Internal server error",
        },
    });
}

