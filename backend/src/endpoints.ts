// endpoints.ts
// Define endpoints for public API.

import express from 'express';
import * as db from './db';
import logger from './middleware/logging';

export const server = express();

/* Register middleware */
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(logger);


/*==================*/
/* Define Endpoints */
/*==================*/

/* Sanity check endpoints */

server.get("/echo-get", (req, res) => {
    res.json(req.query);
})

server.post("/echo-post", (req, res) => {
    res.json(req.body);
})

/* Database test endpoint */

server.post("/db-post", (req, res) => {
    if (req.body.value !== undefined) {
        db.writeKv(req.body.key, req.body.value);
        res.json({ key: req.body.key, value: req.body.value });
    }
    else {
        db.readKv(req.body.key, (val: string | undefined, err: string | null) => {
            if (val) {
                res.json({ key: req.body.key, value: val });
            } else {
                res.status(400).send("400: Key not found!");
            }
        });
    }
});

require("./auth").initAuthEndpoints(server);
