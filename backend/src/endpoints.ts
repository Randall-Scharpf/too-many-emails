// endpoints.ts
// Define endpoints for public API.

import express from 'express';
import * as db from './db';
import { getLog } from './logging';

const log = getLog(__filename);
export const server = express();

/* Register middleware */
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


/*==================*/
/* Define Endpoints */
/*==================*/

/* Sanity check endpoints */

server.get("/echo-get", (req, res) => {
    log(`Request URL: ${req.url}`);
    res.json(req.query);
})

server.post("/echo-post", (req, res) => {
    log(`Request URL: ${req.url}`);
    res.json(req.body);
})

/* Database test endpoint */

server.post("/db-post", (req, res) => {
    if (req.body.value !== undefined) {
        log("Writing", req.body.key, req.body.value);
        db.writeKv(req.body.key, req.body.value);
        res.json({ key: req.body.key, value: req.body.value });
    }
    else {
        console.group("Reading", req.body.key);
        db.readKv(req.body.key, (val: string | undefined, err: string | undefined) => {
            log("Got", val, err);
            if (val) {
                res.json({ key: req.body.key, value: val });
            } else {
                res.status(400).send("Key not found!");
            }
        });
        console.groupEnd();
    }
});
