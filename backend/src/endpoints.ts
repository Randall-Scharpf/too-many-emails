// endpoints.ts
// Define endpoints for public API.

import express from 'express';
import * as db from './db';
import { getLog, repr } from './logging';

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
    log(`Request Endpoint URL: ${req.url}`);
    res.json(req.query);
})

server.post("/echo-post", (req, res) => {
    log(`Request Endpoint URL: ${req.url}`);
    res.json(req.body);
})

/* Database test endpoint */

server.post("/db-post", (req, res) => {
    if (req.body.value !== undefined) {
        log(`Writing key=${repr(req.body.key)}, value=${repr(req.body.value)}`);
        db.writeKv(req.body.key, req.body.value);
        res.json({ key: req.body.key, value: req.body.value });
    }
    else {
        log(`Reading key=${repr(req.body.key)}, value=${repr(req.body.value)}`);
        db.readKv(req.body.key, (val: string | undefined, err: string | null) => {
            log(`Got val=${repr(val)}, err=${repr(err)}`);
            if (val) {
                res.json({ key: req.body.key, value: val });
            } else {
                res.status(400).send("400: Key not found!");
            }
        });
    }
});

require("./auth").initAuthEndpoints(server);
