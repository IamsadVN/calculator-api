import { NextFunction, Request, Response } from "express";
import { Logger } from "../utils/logger.js";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    Logger.info(`${req.method} ${req.path} (Client: ${req.ip})`);

    next();
}