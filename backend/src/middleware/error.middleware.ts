import {Request, Response, NextFunction} from "express";
import logger from "../config/logger.config";

/**
 * * Error handling middleware.
 * * This middleware captures errors that occur during the request-response cycle
 * @param err
 * @param req
 * @param res
 * @param next
 */
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

