// logging.ts
// Handle logging for debugging purposes.

import { Request, Response } from "express";
import moment = require("moment");

/* ANSI escape sequences for colored console text.  */
const YELLOW = "\x1b[33m";
const END = "\x1b[0m";

/**
 * Logger function to use as middleware.
 */
export default function logger(
    req: Request,
    res: Response,
    next: Function
): void {

    console.log(
        `${YELLOW}${req.protocol}://${req.get('host')}${req.originalUrl}${END}`
        + `: ${moment().format()}`
    );
    next();
}
