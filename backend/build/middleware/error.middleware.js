"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_config_1 = __importDefault(require("../config/logger.config"));
/**
 * * Error handling middleware.
 * * This middleware captures errors that occur during the request-response cycle
 * @param err
 * @param req
 * @param res
 * @param next
 */
const errorHandler = (err, req, res, next) => {
    logger_config_1.default.error(err.message);
    logger_config_1.default.error(err.stack);
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({
        error: {
            message: "Internal server error",
        },
    });
};
exports.errorHandler = errorHandler;
