// logging.ts
// Handle logging for debugging purposes.

import { basename } from "node:path";

/* ANSI escape sequences for colored console text */
const GRAY = "\x1b[30m";
const RED = "\x1b[33m";
const END = "\x1b[0m";

/**
 * Return a logger function that you can use in place of `console.log()`.
 *
 * USAGE: `const log = getLog(__filename);`
 */
export function getLog(filename: string): Function {
    // Take only the leaf of the filename if full path specified
    const leaf = basename(filename);
    const timestamp = new Date().toLocaleString(
        "en-US",
        { timeZone: "America/Los_Angeles" }
    );
    return function (message?: any, ...optionalParams: any[]) {
        console.log(
            `${GRAY}[${timestamp}]${END} ${RED}${leaf}${END}: ${message}`,
            ...optionalParams
        );
    };
}
