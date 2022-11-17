import express from 'express';
import * as db from './db';

export const server = express();

/* Register middleware */
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


/*==================*/
/* Define Endpoints */
/*==================*/

/* Sanity check endpoints */

server.get("/echo-get", (req, res) => {
    res.json(req.query);
    console.log(req.url);
})

server.post("/echo-post", (req, res) => {
    res.json(req.body);
    console.log(req.url);
})

/* Database test endpoint */

server.post("/db-post", (req, res) => {
    if (req.body.value !== undefined) {
        console.log("writing", req.body.key, req.body.value);
        db.writeKv(req.body.key, req.body.value);
        res.json({ key: req.body.key, value: req.body.value });
    }
    else {
        console.log("reading", req.body.key);
        db.readKv(req.body.key, (v) => res.json({ key: req.body.key, value: v }));
    }
});
